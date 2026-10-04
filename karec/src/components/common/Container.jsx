import { cn } from '../../utils/cn';

export default function Container({ children, className }) {
  return (
    <div className={cn('mx-auto max-w-[1200px] px-8 md:px-16 lg:px-8', className)}>
      {children}
    </div>
  );
}
