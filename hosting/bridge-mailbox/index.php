<?php
/**
 * Закрытый почтовый ящик моста 1С ↔ Cursor.
 * Не часть публичного СчётИП. Ключ только в .env на сервере (не в git).
 *
 * API:
 *   GET/POST ?action=ping
 *   GET/POST ?action=list
 *   GET/POST ?action=get&name=data_request.json
 *   POST     ?action=put&name=data_request.json   (тело = файл)
 *   POST     ?action=delete&name=data_request.json
 *
 * Заголовок: X-Bridge-Key: <ключ из .env>
 */
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$env = mailbox_load_env(__DIR__ . DIRECTORY_SEPARATOR . '.env');
if ($env === null || empty($env['BRIDGE_KEY'])) {
    mailbox_fail(503, 'mailbox not configured');
}

if (!mailbox_key_ok($env['BRIDGE_KEY'])) {
    // Без ключа притворяемся, что папки нет (не светим API поисковикам).
    mailbox_not_found();
}

if (!mailbox_basic_ok($env)) {
    header('WWW-Authenticate: Basic realm="bridge"');
    mailbox_fail(401, 'basic auth required');
}

$action = isset($_GET['action']) ? strtolower(trim((string)$_GET['action'])) : '';
if ($action === '') {
    $action = 'ping';
}

$dataDir = __DIR__ . DIRECTORY_SEPARATOR . 'data';
mailbox_ensure_dir($dataDir);

$maxBytes = isset($env['MAX_BYTES']) ? (int)$env['MAX_BYTES'] : 2097152;
if ($maxBytes < 1024) {
    $maxBytes = 2097152;
}

try {
    switch ($action) {
        case 'ping':
            mailbox_json(array(
                'ok' => true,
                'service' => 'bridge-mailbox',
                'time' => gmdate('c'),
            ));
            break;
        case 'list':
            mailbox_json(array(
                'ok' => true,
                'files' => mailbox_list_files($dataDir),
            ));
            break;
        case 'get':
            $name = mailbox_safe_name(isset($_GET['name']) ? (string)$_GET['name'] : '');
            if ($name === null) {
                mailbox_fail(400, 'bad name');
            }
            $path = $dataDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $name);
            if (!is_file($path)) {
                mailbox_fail(404, 'not found');
            }
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            $ctype = ($ext === 'xml') ? 'application/xml' : 'application/json';
            if ($ext === 'bsl') {
                $ctype = 'text/plain; charset=utf-8';
            }
            header('Content-Type: ' . $ctype);
            header('X-Bridge-Name: ' . $name);
            header('X-Bridge-Sha256: ' . hash_file('sha256', $path));
            readfile($path);
            exit;
        case 'put':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
                mailbox_fail(405, 'POST required');
            }
            $name = mailbox_safe_name(isset($_GET['name']) ? (string)$_GET['name'] : '');
            if ($name === null) {
                mailbox_fail(400, 'bad name');
            }
            $body = file_get_contents('php://input');
            if ($body === false) {
                mailbox_fail(400, 'empty body');
            }
            if (strlen($body) > $maxBytes) {
                mailbox_fail(413, 'too large');
            }
            $path = $dataDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $name);
            $dir = dirname($path);
            mailbox_ensure_dir($dir);
            $tmp = $path . '.tmp.' . bin2hex(random_bytes(4));
            if (file_put_contents($tmp, $body) === false) {
                mailbox_fail(500, 'write failed');
            }
            if (!rename($tmp, $path)) {
                @unlink($tmp);
                mailbox_fail(500, 'rename failed');
            }
            mailbox_json(array(
                'ok' => true,
                'name' => $name,
                'size' => strlen($body),
                'sha256' => hash('sha256', $body),
                'mtime' => gmdate('c', filemtime($path)),
            ));
            break;
        case 'delete':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
                mailbox_fail(405, 'POST required');
            }
            $name = mailbox_safe_name(isset($_GET['name']) ? (string)$_GET['name'] : '');
            if ($name === null) {
                mailbox_fail(400, 'bad name');
            }
            $path = $dataDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $name);
            if (is_file($path)) {
                unlink($path);
            }
            mailbox_json(array('ok' => true, 'name' => $name, 'deleted' => true));
            break;
        default:
            mailbox_fail(400, 'unknown action');
    }
} catch (Exception $e) {
    mailbox_fail(500, 'server error');
}

function mailbox_load_env($path)
{
    if (!is_file($path)) {
        return null;
    }
    $out = array();
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        return null;
    }
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }
        $eq = strpos($line, '=');
        if ($eq === false) {
            continue;
        }
        $key = trim(substr($line, 0, $eq));
        $val = trim(substr($line, $eq + 1));
        $val = trim($val, "\"'");
        $out[$key] = $val;
    }
    return $out;
}

function mailbox_key_ok($expected)
{
    $got = '';
    if (!empty($_SERVER['HTTP_X_BRIDGE_KEY'])) {
        $got = (string)$_SERVER['HTTP_X_BRIDGE_KEY'];
    } elseif (!empty($_SERVER['HTTP_AUTHORIZATION']) && stripos($_SERVER['HTTP_AUTHORIZATION'], 'Bearer ') === 0) {
        $got = trim(substr($_SERVER['HTTP_AUTHORIZATION'], 7));
    } elseif (isset($_GET['key'])) {
        // запасной путь для отладки; в проде лучше только заголовок
        $got = (string)$_GET['key'];
    }
    if ($got === '' || $expected === '') {
        return false;
    }
    if (function_exists('hash_equals')) {
        return hash_equals($expected, $got);
    }
    return $expected === $got;
}

function mailbox_basic_ok($env)
{
    $user = isset($env['BRIDGE_BASIC_USER']) ? $env['BRIDGE_BASIC_USER'] : '';
    $pass = isset($env['BRIDGE_BASIC_PASS']) ? $env['BRIDGE_BASIC_PASS'] : '';
    if ($user === '') {
        return true;
    }
    $ru = isset($_SERVER['PHP_AUTH_USER']) ? (string)$_SERVER['PHP_AUTH_USER'] : '';
    $rp = isset($_SERVER['PHP_AUTH_PW']) ? (string)$_SERVER['PHP_AUTH_PW'] : '';
    if (function_exists('hash_equals')) {
        return hash_equals($user, $ru) && hash_equals($pass, $rp);
    }
    return $user === $ru && $pass === $rp;
}

function mailbox_safe_name($name)
{
    $name = str_replace('\\', '/', trim($name));
    $name = ltrim($name, '/');
    if ($name === '' || strpos($name, '..') !== false) {
        return null;
    }
    if (!preg_match('#^(?:[A-Za-z0-9_-]+/)*[A-Za-z0-9][A-Za-z0-9._-]*\.(json|jsonl|bsl|xml)$#', $name)) {
        return null;
    }
    if (substr_count($name, '/') > 2) {
        return null;
    }
    $allowedRoots = array(
        '',
        'bg_jobs/',
        'code_snippets/',
        'skd_schemas/',
        'integration/in/',
        'integration/out/',
        'integration/snippets/',
    );
    $ok = false;
    foreach ($allowedRoots as $root) {
        if ($root === '') {
            if (strpos($name, '/') === false) {
                $ok = true;
                break;
            }
        } elseif (strpos($name, $root) === 0) {
            $ok = true;
            break;
        }
    }
    if (!$ok) {
        return null;
    }
    return $name;
}

function mailbox_list_files($root)
{
    $out = array();
    $it = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($it as $file) {
        if (!$file->isFile()) {
            continue;
        }
        $full = $file->getPathname();
        $rel = substr($full, strlen($root) + 1);
        $rel = str_replace('\\', '/', $rel);
        if (mailbox_safe_name($rel) === null) {
            continue;
        }
        $out[] = array(
            'name' => $rel,
            'size' => $file->getSize(),
            'mtime' => gmdate('c', $file->getMTime()),
            'sha256' => hash_file('sha256', $full),
        );
        if (count($out) >= 200) {
            break;
        }
    }
    return $out;
}

function mailbox_ensure_dir($dir)
{
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
}

function mailbox_json($data)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function mailbox_fail($code, $message)
{
    http_response_code($code);
    mailbox_json(array('ok' => false, 'error' => $message));
}

function mailbox_not_found()
{
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>404</title></head><body>Not Found</body></html>';
    exit;
}
