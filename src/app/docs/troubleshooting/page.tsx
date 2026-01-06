import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Troubleshooting | LazorSwift Docs',
    description: 'Common issues and solutions for LazorKit',
};

export default function TroubleshootingPage() {
    const issues = [
        {
            q: "Passkey connection fails on localhost?",
            a: "WebAuthn requires HTTPS or localhost. Ensure you are using a modern browser. On Chrome/Edge, try clearing your 'Security Keys' data if you have stale credentials."
        },
        {
            q: "Transaction failed with 'Insufficient Funds'?",
            a: "Even for gasless transactions, you need the asset you are trying to send (e.g., SOL or USDC) in your Smart Wallet. Use the 'Airdrop' button on Devnet to fund your wallet."
        },
        {
            q: "Peer dependency conflicts with @coral-xyz/anchor?",
            a: "This happens due to version mismatches between Solana libraries. Add 'legacy-peer-deps=true' to your .npmrc file to bypass this during installation."
        },
        {
            q: "Smart Wallet address changed?",
            a: "If you change your portal URL or program ID, the PDA derivation will result in a different address. Always use a consistent configuration for the same user base."
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Troubleshooting</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Common issues and how to resolve them.
                </p>
            </div>

            <div className="space-y-6">
                {issues.map((issue, i) => (
                    <div key={i} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <HelpCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{issue.q}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{issue.a}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-4 mb-4">
                    <AlertCircle className="w-8 h-8 text-indigo-600" />
                    <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Still having trouble?</h2>
                </div>
                <p className="text-indigo-700 dark:text-indigo-300 mb-6">
                    Join the LazorKit developer community for real-time support and technical discussions.
                </p>
                <div className="flex gap-4">
                    <a href="https://discord.gg/lazorkit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Discord</a>
                    <a href="mailto:support@lazorkit.com" className="px-6 py-2 bg-white dark:bg-zinc-800 rounded-xl font-bold">Email Support</a>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/config/theming" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Theming
                </Link>
                <Link href="/docs" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Back to Overview <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
