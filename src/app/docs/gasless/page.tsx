import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, DollarSign, Repeat } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gasless Transactions | LazorSwift Docs',
    description: 'Send transactions without paying gas fees',
};

export default function GaslessPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Gasless Transactions</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Send SOL and tokens without paying network fees.
                </p>
            </div>

            {/* How it Works */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">How Gasless Works</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    LazorKit uses a <strong>Paymaster</strong> service that sponsors transaction fees on behalf of users. This means:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
                        <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <h3 className="font-bold">Zero User Cost</h3>
                        <p className="text-sm text-zinc-500">Users don&apos;t pay SOL for gas</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
                        <Zap className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                        <h3 className="font-bold">Instant UX</h3>
                        <p className="text-sm text-zinc-500">No &quot;approve gas&quot; popups</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
                        <Repeat className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-bold">Seamless Flow</h3>
                        <p className="text-sm text-zinc-500">One-click transactions</p>
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Sending a Gasless Transaction</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

function TransferComponent() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();

    const handleTransfer = async () => {
        // 1. Build the instruction (what you want to do)
        const instruction = SystemProgram.transfer({
            fromPubkey: smartWalletPubkey!,
            toPubkey: new PublicKey('recipient-address'),
            lamports: 0.1 * LAMPORTS_PER_SOL,
        });

        // 2. Send it - Paymaster handles the fee!
        const signature = await signAndSendTransaction({
            instructions: [instruction],
            transactionOptions: {
                feeToken: 'USDC' // Optional: pay fees in USDC
            }
        });

        console.log('Transaction:', signature);
    };

    return <button onClick={handleTransfer}>Send 0.1 SOL</button>;
}`}</code>
                    </pre>
                </div>
            </section>

            {/* Transaction Options */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Transaction Options</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                <th className="text-left py-3 px-4 font-semibold">Option</th>
                                <th className="text-left py-3 px-4 font-semibold">Type</th>
                                <th className="text-left py-3 px-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">feeToken</td>
                                <td className="py-3 px-4 font-mono text-zinc-500">&apos;SOL&apos; | &apos;USDC&apos;</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">Token to use for fees (default: sponsored)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">skipPreflight</td>
                                <td className="py-3 px-4 font-mono text-zinc-500">boolean</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">Skip preflight simulation</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Batch Transfers */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Batch Transfers</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Send to multiple recipients in a single atomic transaction:
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`const instructions = recipients.map(r => 
    SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: new PublicKey(r.address),
        lamports: r.amount * LAMPORTS_PER_SOL,
    })
);

// All transfers in ONE transaction
await signAndSendTransaction({ instructions });`}</code>
                    </pre>
                </div>
            </section>

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/smart-wallets" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Smart Wallets
                </Link>
                <Link href="/docs/paymaster" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Paymaster <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
