'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Zap } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
];

export function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap size={18} className="text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            LazorSwift
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${pathname === item.href || pathname.startsWith(item.href + '/')
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <a
                            href="https://github.com/0xsupremedev/lazor-swift"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            GitHub
                        </a>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block py-2 text-sm font-medium ${pathname === item.href
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-zinc-600 dark:text-zinc-400'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
