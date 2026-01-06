import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'TransferSOL | LazorSwift Docs',
    description: 'Component for sending SOL gaslessly',
};

export default function TransferSOLDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/components/connect-wallet" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to ConnectWallet
                </Link>
                <h1 className="text-3xl font-bold">TransferSOL</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    A simple UI component for sending SOL from the Smart Wallet.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Code Example</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { TransferSOL } from '@/components/TransferSOL';

export function WalletDashboard() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">Send SOL</h2>
      <TransferSOL />
    </div>
  );
}`}</code>
                    </pre>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Implementation Details</h2>
                <p className="text-zinc-600 dark:text-zinc-400 italic">
                    This component interacts with the `useWallet` hook to sign and send transactions.
                </p>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex gap-2">
                            <Send size={16} className="text-indigo-500 mt-0.5" />
                            <span><strong>Fee Sponsorship:</strong> Automatically uses the Paymaster for gasless transfers.</span>
                        </li>
                        <li className="flex gap-2">
                            <Send size={16} className="text-indigo-500 mt-0.5" />
                            <span><strong>Recipient Validation:</strong> Ensures valid Solana public keys are used.</span>
                        </li>
                        <li className="flex gap-2">
                            <Send size={16} className="text-indigo-500 mt-0.5" />
                            <span><strong>Balance Check:</strong> Validates sufficient Smart Wallet balance before sending.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/components/connect-wallet" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> ConnectWallet
                </Link>
                <Link href="/docs/components/batch-transfer" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    BatchTransfer <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
