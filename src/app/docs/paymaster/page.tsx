import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Paymaster | LazorSwift Docs',
    description: 'How the LazorKit Paymaster handles sponsored transactions',
};

export default function PaymasterPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Paymaster & Sponsorship</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    The infrastructure that makes "Zero Gas" possible for your users.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">What is a Paymaster?</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    A Paymaster is a specialized off-chain service that signs Solana transactions to act as the <strong>Fee Payer</strong>. Normally, the user (the sender) must have SOL in their wallet to pay for the network fees. With a paymaster, the paymaster funds the fee instead.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Workflow</h2>
                <div className="p-8 bg-zinc-900 rounded-3xl text-white">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">1</div>
                            <div className="text-sm">App builds a <code className="bg-zinc-800 px-1 rounded text-indigo-300">TransactionInstruction</code></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">2</div>
                            <div className="text-sm">SDK sends the instruction to the <span className="font-bold text-indigo-400">Lazor Paymaster API</span></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">3</div>
                            <div className="text-sm">Paymaster validates the request and returns a <span className="font-bold text-indigo-400">Signed Transaction</span></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">4</div>
                            <div className="text-sm">Transaction is broadcast to Solana Devnet/Mainnet</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Configuring Paymaster</h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium italic">
                    LazorSwift comes pre-configured to use the official LazorKit Paymaster on Devnet.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">
                        <code>{`// In your .env.local
NEXT_PUBLIC_PAYMASTER_URL=https://api.lazorkit.com/v1/paymaster`}</code>
                    </pre>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/gasless" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Gasless
                </Link>
                <Link href="/docs/components/provider" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    LazorProvider <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
