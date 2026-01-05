'use client';

import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState, useCallback } from 'react';
import { ExternalLink, ArrowUpRight, Clock } from 'lucide-react';
import { CONFIG } from '../utils/config';

interface Transaction {
    signature: string;
    slot: number;
    time: number | null;
    status: 'success' | 'failed';
}

export function ActivityFeed() {
    const { smartWalletPubkey, isConnected } = useWallet();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = useCallback(async () => {
        if (!smartWalletPubkey) return;

        try {
            setLoading(true);
            const response = await fetch(CONFIG.RPC_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'getSignaturesForAddress',
                    params: [smartWalletPubkey.toBase58(), { limit: 5 }]
                })
            });
            const data = await response.json();

            if (data.result) {
                const mapped: Transaction[] = data.result.map((tx: { signature: string; slot: number; blockTime: number | null; err: unknown }) => ({
                    signature: tx.signature,
                    slot: tx.slot,
                    time: tx.blockTime,
                    status: tx.err ? 'failed' : 'success'
                }));
                setTransactions(mapped);
            }
        } catch (e) {
            console.error('Failed to fetch transactions', e);
        } finally {
            setLoading(false);
        }
    }, [smartWalletPubkey]);

    useEffect(() => {
        if (isConnected && smartWalletPubkey) {
            fetchTransactions();
            const interval = setInterval(fetchTransactions, 15000); // Poll every 15s
            return () => clearInterval(interval);
        }
    }, [isConnected, smartWalletPubkey, fetchTransactions]);

    if (!isConnected) return null;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Clock size={18} className="text-gray-400" />
                    Recent Activity
                </h3>
                <button
                    onClick={fetchTransactions}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
                >
                    Refresh
                </button>
            </div>

            <div className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {loading && transactions.length === 0 ? (
                    <div className="p-10 text-center text-gray-400 text-sm animate-pulse">
                        Loading transactions...
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="p-10 text-center text-gray-400 text-sm italic">
                        No recent transactions found on devnet.
                    </div>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx.signature} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.status === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                                        }`}>
                                        <ArrowUpRight size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold truncate max-w-[120px] md:max-w-none">
                                            {tx.signature.slice(0, 8)}...{tx.signature.slice(-4)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {tx.time ? new Date(tx.time * 1000).toLocaleTimeString() : `Slot: ${tx.slot}`}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-all"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
