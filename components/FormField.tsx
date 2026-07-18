"use client";

import Hint from "@/components/Hint";

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  hint,
  placeholder,
  min,
  max,
  disabled,
  labelClassName = "text-xs font-medium text-slate-600",
  inputClassName = "rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  hint?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={`mb-1 flex items-center ${labelClassName}`}>
        {label}
        {hint ? <Hint text={hint} /> : null}
      </span>
      <input
        type={type}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${inputClassName} disabled:bg-slate-50`}
      />
    </label>
  );
}
