import './globals.css';
import Navbar from '@/components/Navbar';
import MobileMenu from '@/components/MobileMenu';

export const metadata = {
  title: 'MeCrypt App',
  description: 'A modern text encryption tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-900 text-slate-200 min-h-screen">
          <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <Navbar />
            <main className="pb-24 md:pb-0">
              {children}
            </main>
            <MobileMenu />
          </div>
        </div>
      </body>
    </html>
  );
}