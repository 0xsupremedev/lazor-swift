'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';

export function TransferSOL() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('0.1');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [txHash, setTxHash] = useState('');

    const handleTransfer = async () => {
        if (!smartWalletPubkey) return;

        try {
            setStatus('sending');

            const destination = new PublicKey(recipient);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey,
                toPubkey: destination,
                lamports,
            });

            const signature = await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: {
                    feeToken: 'USDC' // Optional: Pay gas in USDC if configured, or use paymaster
                }
            });

            console.log('Transaction confirmed:', signature);
            setTxHash(signature);
            setStatus('success');
            toast.success('Transfer Successful', {
                description: `Sent ${amount} SOL gasless!`,
                action: {
                    label: 'View Explorer',
                    onClick: () => window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank')
                }
            });
        } catch (error) {
            console.error('Transfer failed:', error);
            setStatus('error');
            toast.error('Transfer Failed', {
                description: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }
    };

    return (
        <div className="p-6 border rounded-xl shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-4">Gasless SOL Transfer</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Recipient Address</label>
                    <input
                        type="text"
                        placeholder="Solana Address"
                        className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Amount (SOL)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleTransfer}
                    disabled={status === 'sending' || !recipient}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Gasless Transaction'}
                </button>

                {status === 'success' && (
                    <div className="p-3 bg-green-100 text-green-800 text-sm rounded-md">
                        Success! custom tx: {txHash.slice(0, 10)}...
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-3 bg-red-100 text-red-800 text-sm rounded-md">
                        Transaction failed. Check console.
                    </div>
                )}
            </div>
        </div>
    );
}
