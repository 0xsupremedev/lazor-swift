'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';

interface PaymentWidgetProps {
    recipient: string;
    defaultAmount?: number;
    title?: string;
}

export function PaymentWidget({ recipient, defaultAmount = 0.05, title = "Pay with Lazor" }: PaymentWidgetProps) {
    const { signAndSendTransaction, smartWalletPubkey, connect, isConnected } = useWallet();
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);

    const handlePay = async () => {
        if (!isConnected) {
            connect();
            return;
        }

        try {
            setLoading(true);
            const destination = new PublicKey(recipient);
            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey!,
                toPubkey: destination,
                lamports: defaultAmount * LAMPORTS_PER_SOL,
            });

            await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: { feeToken: 'USDC' }
            });

            toast.success('Payment Successful', {
                description: `Sent ${defaultAmount} SOL to ${recipient.slice(0, 4)}...${recipient.slice(-4)}`
            });
        } catch (e) {
            console.error(e);
            toast.error('Payment Failed', {
                description: e instanceof Error ? e.message : 'Unknown error'
            });
        } finally {
            setLoading(false);
        }
    };

    const codeSnippet = `<PaymentWidget \n  recipient="${recipient}" \n  defaultAmount={${defaultAmount}} \n/>`;

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white dark:bg-black rounded-[22px] p-8 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-inner">
                        ⚡
                    </div>
                    <h4 className="font-bold text-2xl mb-2">{title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                        Send {defaultAmount} SOL gasless with just one swipe.
                    </p>

                    <button
                        onClick={handlePay}
                        disabled={loading}
                        className="w-full py-4 px-8 bg-black dark:bg-white text-white dark:text-black font-extrabold rounded-xl shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all text-lg"
                    >
                        {loading ? 'Processing...' : isConnected ? 'Swipe to Pay' : 'Connect & Pay'}
                    </button>

                    <div className="mt-6 text-xs text-gray-400 font-medium tracking-widest uppercase">
                        Powered by LazorKit
                    </div>
                </div>
            </div>

            <div className="px-2">
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center gap-2 hover:underline"
                >
                    {showCode ? 'Hide Snippet' : '</> View Code Snippet'}
                </button>

                {showCode && (
                    <div className="mt-3 p-4 bg-gray-100 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
                        <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
