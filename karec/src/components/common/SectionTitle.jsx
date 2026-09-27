import { cn } from '../../utils/cn';

export default function SectionTitle({ children, className, subtitle }) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-blue-200 font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
