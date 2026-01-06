'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Book, Zap, Code, Settings, ChevronRight, X } from 'lucide-react';

// Documentation structure
const docsNav = [
    {
        title: 'Getting Started',
        icon: Zap,
        items: [
            { title: 'Introduction', href: '/docs' },
            { title: 'Quick Start', href: '/docs/quickstart' },
            { title: 'Installation', href: '/docs/installation' },
        ],
    },
    {
        title: 'Core Concepts',
        icon: Book,
        items: [
            { title: 'Passkey Authentication', href: '/docs/passkey-auth' },
            { title: 'Smart Wallets', href: '/docs/smart-wallets' },
            { title: 'Gasless Transactions', href: '/docs/gasless' },
            { title: 'Paymaster', href: '/docs/paymaster' },
        ],
    },
    {
        title: 'Components',
        icon: Code,
        items: [
            { title: 'LazorProvider', href: '/docs/components/provider' },
            { title: 'ConnectWallet', href: '/docs/components/connect-wallet' },
            { title: 'TransferSOL', href: '/docs/components/transfer-sol' },
            { title: 'BatchTransfer', href: '/docs/components/batch-transfer' },
            { title: 'PaymentWidget', href: '/docs/components/payment-widget' },
        ],
    },
    {
        title: 'Configuration',
        icon: Settings,
        items: [
            { title: 'Environment Variables', href: '/docs/config/env' },
            { title: 'RPC Configuration', href: '/docs/config/rpc' },
            { title: 'Theming', href: '/docs/config/theming' },
        ],
    },
];

// All searchable content
const searchableContent = docsNav.flatMap(section =>
    section.items.map(item => ({
        ...item,
        section: section.title,
    }))
);

interface DocsLayoutProps {
    children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return searchableContent.filter(
            item =>
                item.title.toLowerCase().includes(query) ||
                item.section.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:block w-72 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
                <div className="p-6">
                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search docs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchOpen(true)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-4 h-4 text-zinc-400" />
                            </button>
                        )}

                        {/* Search Results Dropdown */}
                        {searchOpen && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                                {searchResults.map((result) => (
                                    <Link
                                        key={result.href}
                                        href={result.href}
                                        onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                                        className="block px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-700 last:border-0"
                                    >
                                        <div className="text-sm font-medium">{result.title}</div>
                                        <div className="text-xs text-zinc-500">{result.section}</div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-6">
                        {docsNav.map((section) => (
                            <div key={section.title}>
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                                    <section.icon className="w-4 h-4" />
                                    {section.title}
                                </div>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${pathname === item.href
                                                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                                    }`}
                                            >
                                                <ChevronRight className={`w-3 h-3 transition-transform ${pathname === item.href ? 'rotate-90' : ''}`} />
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
