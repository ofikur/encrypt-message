"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
    { href: "/encrypt", icon: faLock, label: "Encrypt" },
    { href: "/decrypt", icon: faLockOpen, label: "Decrypt" },
];

function MobileMenu() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-sm">
            <div className="flex justify-around items-center bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-full shadow-lg p-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href; // Check if the link is active

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`${isActive ? 'text-blue-400' : 'text-slate-400'} flex flex-col items-center justify-center w-24 h-12 rounded-full transition-colors duration-200 hover:bg-slate-700/50`}
                            aria-label={item.label}
                        >
                            <FontAwesomeIcon icon={item.icon} size="lg" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default MobileMenu;