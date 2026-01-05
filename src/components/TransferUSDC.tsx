'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { PublicKey } from '@solana/web3.js';
import * as splToken from '@solana/spl-token';

// USDC Devnet Mint Address
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export function TransferUSDC() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('1');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [txHash, setTxHash] = useState('');

    const handleTransfer = async () => {
        if (!smartWalletPubkey) return;

        try {
            setStatus('sending');

            const destinationPubkey = new PublicKey(recipient);
            const mintPubkey = USDC_MINT;
            const transferAmount = parseFloat(amount) * 1_000_000; // 6 decimals for USDC

            // 1. Get/Create Associated Token Accounts
            // Note: In a real app, you'd check if these exist first or use an instruction that creates them if needed.
            // For simplicity, we assume the sender has an ATA. The recipient might need one created.

            // 1. Get Associated Token Addresses
            const senderAta = await splToken.getAssociatedTokenAddress(
                mintPubkey,
                smartWalletPubkey,
                true // allowOwnerOffCurve - important for PDAs/Smart Wallets
            );

            const recipientAta = await splToken.getAssociatedTokenAddress(
                mintPubkey,
                destinationPubkey,
                true // Also allow for recipient if they are a smart wallet
            );

            const instructions = [];

            // In a production app, we would use createAssociatedTokenAccountIdempotentInstruction
            // but for this demo, we'll try the transfer and inform the user if setup is needed.
            // LazorKit's signAndSendTransaction will handle the payer/sponsorship.

            // Standard SPL Token Transfer
            const transferIx = splToken.createTransferInstruction(
                senderAta,
                recipientAta,
                smartWalletPubkey,
                transferAmount,
                [],
                splToken.TOKEN_PROGRAM_ID
            );

            instructions.push(transferIx);

            const signature = await signAndSendTransaction({
                instructions,
                transactionOptions: {
                    feeToken: 'USDC' // Pay gas in USDC
                }
            });

            console.log('Transaction confirmed:', signature);
            setTxHash(signature);
            setStatus('success');
        } catch (error) {
            console.error('Transfer failed:', error);
            // Provide more descriptive error if it's likely a missing ATA
            if (error instanceof Error && (error.message.includes('AccountNotFound') || error.message.includes('0x1'))) {
                alert('Transfer failed: Recipient might not have a USDC account. This demo requires the recipient to have an existing USDC ATA.');
            }
            setStatus('error');
        }
    };

    return (
        <div className="p-6 border rounded-xl shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">test-USDC</span> Gasless Transfer
            </h3>

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
                    <label className="block text-sm font-medium mb-1">Amount (USDC)</label>
                    <input
                        type="number"
                        step="1"
                        className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleTransfer}
                    disabled={status === 'sending' || !recipient}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                    {status === 'sending' ? 'Sending...' : 'Send USDC (Gasless)'}
                </button>

                {status === 'success' && (
                    <div className="p-3 bg-green-100 text-green-800 text-sm rounded-md break-all">
                        Success! {txHash}
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-3 bg-red-100 text-red-800 text-sm rounded-md">
                        Transfer failed. Check console.
                    </div>
                )}
            </div>
        </div>
    );
}
