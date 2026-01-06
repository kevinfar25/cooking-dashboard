
import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  variant?: 'pink' | 'blue' | 'cyan';
  className?: string;
}

export const ClayCard: React.FC<ClayCardProps> = ({ children, variant = 'pink', className = '' }) => {
  const variantClass = variant === 'pink' ? 'clay-card-pink' : 
                       variant === 'blue' ? 'clay-card-blue' : 
                       'clay-card-cyan';
  
  return (
    <div className={`${variantClass} ${className} transition-all duration-300`}>
      {children}
    </div>
  );
};
