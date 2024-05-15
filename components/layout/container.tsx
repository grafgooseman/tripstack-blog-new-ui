// import React from 'react';

// interface ContainerProps {
//   children: React.ReactNode;
//   maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
//   className?: string;
// }

// const maxWidthClasses: { [key: string]: string } = {
//   xs: 'max-w-xs',
//   sm: 'max-w-sm',
//   md: 'max-w-md',
//   lg: 'max-w-lg',
//   xl: 'max-w-xl',
// };

// const Container: React.FC<ContainerProps> = ({ children, maxWidth = 'lg', className = '' }) => {
//   const resolveMaxWidthClass = () => maxWidthClasses[maxWidth] || maxWidthClasses.lg;

//   return (
//     <div className={`mx-auto px-4 ${resolveMaxWidthClass()} ${className}`}>
//       {children}
//     </div>
//   );
// };

// export default Container;
