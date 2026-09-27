import { cn } from '../../utils/cn';

export default function Card({ 
  children, 
  className,
  hover = false,
}) {
  return (
    <div className={cn(
      'bg-ec-card rounded-[20px] p-8 border-4 border-blue-800 shadow-[0_10px_0_rgba(0,13,54,1)]',
      hover && 'transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_14px_0_rgba(0,13,54,1)]',
      className
    )}>
      {children}
    </div>
  );
}
