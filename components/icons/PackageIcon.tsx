import React from 'react';

export const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16.5 9.4a4.5 4.5 0 1 0 0-5.8 4.5 4.5 0 0 0 0 5.8z"/>
    <path d="M5.5 14.9a10 10 0 0 0 14.1 0"/>
    <path d="M12 12v9.5"/>
    <path d="M20 16.5c-3-2-5-5-5-9.5"/>
    <path d="M4 16.5c3-2 5-5 5-9.5"/>
  </svg>
);
