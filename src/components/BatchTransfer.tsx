'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';
import { toast } from 'sonner';
import { Plus, Trash2, Send, Users } from 'lucide-react';

interface Recipient {
    address: string;
    amount: string;
}

export function BatchTransfer() {
    const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();
    const [recipients, setRecipients] = useState<Recipient[]>([{ address: '', amount: '' }]);
    const [loading, setLoading] = useState(false);

    const addRecipient = () => {
        setRecipients([...recipients, { address: '', amount: '' }]);
    };

    const removeRecipient = (index: number) => {
        setRecipients(recipients.filter((_, i) => i !== index));
    };

    const updateRecipient = (index: number, field: keyof Recipient, value: string) => {
        const newRecipients = [...recipients];
        newRecipients[index][field] = value;
        setRecipients(newRecipients);
    };

    const handleBatchTransfer = async () => {
        if (!smartWalletPubkey) return;

        try {
            setLoading(true);
            const instructions: TransactionInstruction[] = [];

            for (const r of recipients) {
                if (!r.address || !r.amount) continue;

                let destination: PublicKey;
                try {
                    destination = new PublicKey(r.address.trim());
                    if (!PublicKey.isOnCurve(destination.toBuffer())) {
                        throw new Error(`Invalid address for recipient: ${r.address}`);
                    }
                } catch (e) {
                    throw new Error(`Invalid receiver address: ${r.address}`);
                }

                const parsedAmount = parseFloat(r.amount);
                if (isNaN(parsedAmount) || parsedAmount <= 0) {
                    throw new Error(`Invalid amount for ${r.address}: ${r.amount}`);
                }

                instructions.push(
                    SystemProgram.transfer({
                        fromPubkey: smartWalletPubkey,
                        toPubkey: destination,
                        lamports: parsedAmount * LAMPORTS_PER_SOL,
                    })
                );
            }

            if (instructions.length === 0) {
                toast.error('Please add at least one valid recipient');
                return;
            }

            const signature = await signAndSendTransaction({
                instructions,
                transactionOptions: { feeToken: 'USDC' }
            });

            toast.success('Batch Transfer Successful', {
                description: `Sent to ${instructions.length} recipients in 1 tx!`,
                action: {
                    label: 'View Explorer',
                    onClick: () => window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank')
                }
            });

            // Reset form
            setRecipients([{ address: '', amount: '' }]);

        } catch (error) {
            console.error('Batch transfer failed:', error);
            toast.error('Batch Transfer Failed', {
                description: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isConnected) return null;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Batch Transfer</h3>
                    <p className="text-sm text-gray-500">Atomic 1-click payout to multiple people</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {recipients.map((recipient, index) => (
                    <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                            <input
                                placeholder="Recipient Address"
                                value={recipient.address}
                                onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Amount (SOL)"
                                    value={recipient.amount}
                                    onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                                    className="w-32 p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                                />
                                {recipients.length > 1 && (
                                    <button
                                        onClick={() => removeRecipient(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={addRecipient}
                    className="flex-1 py-2 px-4 border border-dashed border-zinc-300 dark:border-zinc-700 text-gray-500 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                    <Plus size={16} /> Add Recipient
                </button>
                <button
                    onClick={handleBatchTransfer}
                    disabled={loading}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                >
                    {loading ? 'Sending...' : <><Send size={16} /> Send Batch</>}
                </button>
            </div>
        </div>
    );
}
