import React, { forwardRef, useMemo } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
}

type PasswordStrength = 'weak' | 'medium' | 'strong';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  fullWidth = false,
  className = '',
  type,
  value,
  ...props
}, ref) => {

  /* ---------------- PASSWORD STRENGTH ---------------- */

  const passwordStrength = useMemo<PasswordStrength | null>(() => {
    if (type !== 'password') return null;
    if (typeof value !== 'string') return null;
    if (value.length === 0) return null;

    const rules = {
      length: value.length >= 8,
      lower: /[a-z]/.test(value),
      upper: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
    };

    const passedRules = Object.values(rules).filter(Boolean).length;

    if (value.length < 6 || passedRules <= 2) return 'weak';
    if (passedRules === 3) return 'medium';
    return 'strong';
  }, [type, value]);

  /* ---------------- STYLES ---------------- */

  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

  const inputBaseClass =
    `block rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 sm:text-sm ${errorClass}`;

  const adornmentClass = startAdornment ? 'pl-10' : '';

  const strengthStyles: Record<PasswordStrength, string> = {
    weak: 'bg-red-500 w-1/3',
    medium: 'bg-yellow-500 w-2/3',
    strong: 'bg-green-500 w-full',
  };

  const strengthText: Record<PasswordStrength, string> = {
    weak: 'Weak password',
    medium: 'Medium strength',
    strong: 'Strong password',
  };

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {startAdornment}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          className={`${inputBaseClass} ${adornmentClass} ${widthClass}`}
          {...props}
        />

        {endAdornment && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {endAdornment}
          </div>
        )}
      </div>

      {/* PASSWORD STRENGTH METER */}
      {passwordStrength && (
        <div className="mt-2">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strengthStyles[passwordStrength]}`}
            />
          </div>
          <p
            className={`mt-1 text-xs font-medium ${passwordStrength === 'weak'
              ? 'text-red-600'
              : passwordStrength === 'medium'
                ? 'text-yellow-600'
                : 'text-green-600'
              }`}
          >
            {strengthText[passwordStrength]}
          </p>
        </div>
      )}

      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
