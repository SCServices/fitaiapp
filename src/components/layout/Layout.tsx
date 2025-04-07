
import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-20 px-4 container mx-auto max-w-lg">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
