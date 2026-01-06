import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Wallet, Code } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Documentation | LazorSwift',
    description: 'Complete documentation for LazorSwift - Passkey-native Solana SDK',
};

const features = [
    {
        icon: Zap,
        title: 'Passkey Authentication',
        description: 'Biometric login with FaceID, TouchID, or Windows Hello. No seed phrases.',
        href: '/docs/passkey-auth',
    },
    {
        icon: Shield,
        title: 'Gasless Transactions',
        description: 'Send SOL and tokens without paying network fees. Paymaster handles everything.',
        href: '/docs/gasless',
    },
    {
        icon: Wallet,
        title: 'Smart Wallets',
        description: 'PDA-based accounts with programmable logic and session management.',
        href: '/docs/smart-wallets',
    },
    {
        icon: Code,
        title: 'React Components',
        description: 'Drop-in components for wallet connection, transfers, and payments.',
        href: '/docs/components/provider',
    },
];

export default function DocsHomePage() {
    return (
        <div className="space-y-16">
            {/* Header */}
            <div className="space-y-6 border-b border-zinc-100 dark:border-zinc-900 pb-12">
                <h1 className="text-5xl font-bold tracking-tight">
                    LazorKit Documentation
                </h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400">
                    Documentation for LazorKit SDKs.
                </p>
                <div className="space-y-6 max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <p>
                        LazorKit allows you to build <span className="font-semibold text-zinc-900 dark:text-white">Passkey-native</span> Solana applications.
                    </p>
                    <p>
                        Traditionally, crypto requires users to manage complex seed phrases. LazorKit replaces this with the standard biometrics users already know: <span className="font-semibold text-zinc-900 dark:text-white">FaceID, TouchID, or Windows Hello.</span>
                    </p>
                    <p>
                        By leveraging WebAuthn and smart accounts (PDAs), LazorKit provides a <span className="font-semibold text-zinc-900 dark:text-white">seedless onboarding experience</span> that is both secure and familiar—turning every device into a hardware wallet.
                    </p>
                </div>
            </div>

            {/* SDKs Grid */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">SDKs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group relative p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500 transition-all cursor-pointer">
                        <h3 className="text-2xl font-bold mb-4">React Native SDK</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            React Native bindings for iOS and Android. Implements native passkey integration and secure storage.
                        </p>
                        <div className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            React Native Documentation <ArrowRight size={18} />
                        </div>
                    </div>

                    <div className="group relative p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500 transition-all cursor-pointer">
                        <h3 className="text-2xl font-bold mb-4">React SDK</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            React hooks and components for web applications. Supports browser-based WebAuthn authentication.
                        </p>
                        <div className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            React Documentation <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Concepts */}
            <div className="space-y-12 pt-12">
                <h2 className="text-3xl font-bold tracking-tight">Core Concepts</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.filter(f => f.title !== 'React Components').map((feature) => (
                        <Link
                            key={feature.title}
                            href={feature.href}
                            className="group block"
                        >
                            <h3 className="font-bold text-xl mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
