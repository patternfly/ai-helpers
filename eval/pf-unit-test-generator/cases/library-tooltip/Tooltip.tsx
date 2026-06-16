// packages/react-core/src/components/Tooltip/Tooltip.tsx
import { ReactNode, useRef, useState } from 'react';
import { TooltipContent } from './TooltipContent';
import { TooltipArrow } from './TooltipArrow';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  className,
  ...props
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div className={`pf-v6-c-tooltip pf-m-${position} ${className || ''}`}>
          <TooltipArrow />
          <TooltipContent>{content}</TooltipContent>
        </div>
      )}
    </div>
  );
};
