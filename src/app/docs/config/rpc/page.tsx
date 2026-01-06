import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Server, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'RPC Configuration | LazorSwift Docs',
    description: 'How to configure Solana RPC for LazorSwift',
};

export default function RPCDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/config/env" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Environment
                </Link>
                <h1 className="text-3xl font-bold">RPC Configuration</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Connect your app to the Solana network.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Default Network</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    By default, LazorSwift is configured to use the official <strong>Solana Devnet</strong> RPC. This is ideal for testing but heavily rate-limited.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <pre className="text-green-400">
                        <code>{`NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com`}</code>
                    </pre>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Recommended Providers</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://www.helius.dev" target="_blank" className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-500 transition-colors">
                        <div className="font-bold mb-1">Helius</div>
                        <p className="text-xs text-zinc-500">Fastest RPCs for Solana</p>
                    </a>
                    <a href="https://www.ankr.com" target="_blank" className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-500 transition-colors">
                        <div className="font-bold mb-1">Ankr</div>
                        <p className="text-xs text-zinc-500">Reliable global infrastructure</p>
                    </a>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/config/env" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Environment
                </Link>
                <Link href="/docs/config/theming" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Theming <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
