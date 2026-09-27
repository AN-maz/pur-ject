import { cn } from '../../utils/cn';

export default function Badge({ children, className }) {
  return (
    <span className={cn(
      'inline-block px-4 py-1 text-sm font-black text-ec-navy bg-ec-gold rounded-xl border-b-4 border-amber-600',
      className
    )}>
      {children}
    </span>
  );
}
