import { cn } from '../../utils/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  href,
  target,
  onClick,
  className,
}) {
  const baseStyles = 'inline-flex items-center justify-center font-black rounded-2xl border-b-[6px] transition-all duration-300 active:border-b-0 active:translate-y-[5px]';
  
  const variants = {
    primary: 'bg-ec-red text-white border-ec-iron hover:bg-[#eb2334] hover:-translate-y-0.5',
    secondary: 'bg-blue-800 text-white border-blue-950 hover:bg-blue-700 hover:-translate-y-0.5',
    ghost: 'text-ec-gold hover:underline border-transparent border-b-0 hover:translate-y-0',
  };

  const sizes = {
    small: 'px-6 py-2 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-10 py-4 text-lg',
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (href) {
    return (
      <a href={href} target={target} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
