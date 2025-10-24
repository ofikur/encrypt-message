"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-between items-center p-4 bg-slate-800/50 border-b border-slate-700 mb-8 rounded-lg">
      <div className="text-xl font-bold text-white">MeCrypt App</div>
      <div className="flex items-center space-x-6 text-lg">
        <Link
          href="/encrypt"
          className={pathname === '/encrypt' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'}
        >
          <FontAwesomeIcon icon={faLock} className="mr-2" />
          Encrypt
        </Link>
        <Link
          href="/decrypt"
          className={pathname === '/decrypt' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'}
        >
          <FontAwesomeIcon icon={faLockOpen} className="mr-2" />
          Decrypt
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;