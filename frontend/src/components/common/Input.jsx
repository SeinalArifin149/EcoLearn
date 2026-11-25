import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  icon: Icon,
  helperText,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-700 flex items-center gap-1">
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 px-4 text-sm font-medium text-slate-800 bg-white border-2 rounded-2xl transition-all duration-200 outline-none placeholder:text-slate-400 ${
            Icon ? 'pl-11' : ''
          } ${isPassword ? 'pr-11' : ''} ${
            error
              ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer rounded-lg hover:bg-slate-100 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs font-semibold text-red-500 animate-fadeIn">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
