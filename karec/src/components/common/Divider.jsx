import { cn } from '../../utils/cn';

export default function Divider({ className }) {
  return (
    <div className={cn('w-full h-px bg-gradient-to-r from-transparent via-blue-800/60 to-transparent', className)} />
  );
}
