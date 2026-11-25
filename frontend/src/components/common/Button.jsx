import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-xl gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-2xl gap-2 shadow-sm',
    lg: 'text-base px-7 py-3.5 rounded-2xl gap-2.5 shadow-md',
    xl: 'text-lg px-8 py-4 rounded-3xl gap-3 shadow-lg',
  };

  const variantStyles = {
    // Gamified Primary Amber/Orange as seen in ALDICAP's main "Mulai" button
    amber:
      'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white shadow-amber-500/30 hover:shadow-amber-500/40 border-b-4 border-amber-700/40 active:border-b-0',
    // Brand Primary Blue as in ALDICAP Login button
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 hover:shadow-blue-500/35 border-b-4 border-blue-800/40 active:border-b-0',
    // Brand Secondary Green
    green:
      'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 hover:shadow-emerald-500/35 border-b-4 border-emerald-700/40 active:border-b-0',
    // Secondary Light / Soft Gray
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm active:bg-slate-300',
    // Outline style
    outline:
      'bg-white/80 backdrop-blur-xs hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 shadow-xs',
    // Outline Blue
    outlineBlue:
      'bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200 hover:border-blue-400',
    // Ghost
    ghost:
      'bg-transparent hover:bg-slate-100/80 text-slate-600 hover:text-slate-900',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25 border-b-4 border-red-700/40 active:border-b-0',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
