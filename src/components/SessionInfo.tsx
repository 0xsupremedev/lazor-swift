'use client';

import { useWallet } from '@lazorkit/wallet';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useEffect, useState, useCallback } from 'react';

export function SessionInfo() {
    const { smartWalletPubkey, isConnected } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [airdropStatus, setAirdropStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const fetchBalance = useCallback(async () => {
        if (!smartWalletPubkey) return;
        try {
            const response = await fetch('https://api.devnet.solana.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getBalance',
                    params: [smartWalletPubkey.toBase58()]
                })
            });
            const data = await response.json();
            if (data.result) {
                setBalance(data.result.value / LAMPORTS_PER_SOL);
            }
        } catch (e) {
            console.error('Failed to fetch balance', e);
        }
    }, [smartWalletPubkey]);

    useEffect(() => {
        if (isConnected && smartWalletPubkey) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchBalance();
        }
    }, [isConnected, smartWalletPubkey, fetchBalance]);

    const requestAirdrop = async () => {
        if (!smartWalletPubkey) return;
        try {
            setAirdropStatus('loading');
            const response = await fetch('https://api.devnet.solana.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'requestAirdrop',
                    params: [smartWalletPubkey.toBase58(), LAMPORTS_PER_SOL]
                })
            });
            const data = await response.json();
            if (data.result) {
                setAirdropStatus('success');
                setTimeout(() => {
                    setAirdropStatus('idle');
                    fetchBalance();
                }, 3000);
            } else {
                setAirdropStatus('error');
            }
        } catch (e) {
            setAirdropStatus('error');
        }
    };

    if (!isConnected || !smartWalletPubkey) return null;

    return (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    S
                </div>
                <div>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">Smart Account</p>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {smartWalletPubkey.toBase58().slice(0, 4)}...{smartWalletPubkey.toBase58().slice(-4)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Balance</p>
                    <p className="text-lg font-bold">
                        {balance !== null ? `${balance.toFixed(3)} SOL` : '---'}
                    </p>
                </div>

                <button
                    onClick={requestAirdrop}
                    disabled={airdropStatus === 'loading'}
                    className="px-4 py-2 bg-white dark:bg-zinc-800 border border-indigo-200 dark:border-indigo-700 rounded-lg text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                    {airdropStatus === 'loading' ? 'Airdropping...' :
                        airdropStatus === 'success' ? 'Success!' :
                            airdropStatus === 'error' ? 'Failed' : 'Get Devnet SOL'}
                </button>
            </div>
        </div>
    );
}
