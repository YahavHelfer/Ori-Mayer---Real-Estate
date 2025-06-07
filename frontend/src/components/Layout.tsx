// frontend/src/components/Layout.tsx
import React, { ReactNode } from 'react';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton'; // <<< ייבוא הכפתור הצף


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBanner />
      <Navbar />
      {/* הסרנו את "container mx-auto" מה-main כאן.
        main עכשיו תופס את כל הרוחב.
        כל עמוד (למשל, index.tsx) ידאג לעטוף את החלקים הפנימיים שלו 
        שצריכים להיות מוגבלים ברוחבם ב-div עם "container mx-auto".
      */}
      <main className="flex-grow w-full"> {/* main עדיין תופס את כל הגובה הפנוי */}
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton /> {/* <<< הוספת הכפתור כאן */}

    </div>
  );
};

export default Layout;