'use client';

type SpinOnHoverProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SpinOnHover({ children, className = '' }: SpinOnHoverProps) {
  return (
    <span
      className={className}
      onMouseEnter={(e) => {
        const element = e.currentTarget;

        if (element.classList.contains('spin')) return;

        element.classList.add('spin');
        element.addEventListener('animationend', () => element.classList.remove('spin'), {
          once: true,
        });
      }}
    >
      {children}
    </span>
  );
}
