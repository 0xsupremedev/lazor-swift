'use client';

import { useWallet } from '@lazorkit/wallet';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useEffect, useState, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { CONFIG } from '@/utils/config';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export function SessionInfo() {
    const { smartWalletPubkey, isConnected } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
    const [airdropStatus, setAirdropStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [copied, setCopied] = useState(false);

    const fetchBalance = useCallback(async () => {
        if (!smartWalletPubkey) return;
        try {
            // Fetch SOL Balance
            const response = await fetch(CONFIG.RPC_URL, {
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
            if (data.error) throw new Error(data.error.message);
            if (data.result) {
                setBalance(data.result.value / LAMPORTS_PER_SOL);
            }

            // Fetch USDC Balance
            const usdcMint = new PublicKey(CONFIG.USDC_MINT);
            const ata = await getAssociatedTokenAddress(usdcMint, smartWalletPubkey, true);

            const tokenResponse = await fetch(CONFIG.RPC_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 2,
                    method: 'getAccountInfo',
                    params: [
                        ata.toBase58(),
                        { encoding: 'jsonParsed' }
                    ]
                })
            });
            const tokenAccountInfo = await tokenResponse.json();

            if (tokenAccountInfo.result && tokenAccountInfo.result.value) {
                const balanceResponse = await fetch(CONFIG.RPC_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 3,
                        method: 'getTokenAccountBalance',
                        params: [ata.toBase58()]
                    })
                });
                const balanceData = await balanceResponse.json();
                if (balanceData.result) {
                    setUsdcBalance(balanceData.result.value.uiAmount);
                }
            } else {
                setUsdcBalance(0);
            }

        } catch (e) {
            console.error('Failed to fetch balances', e);
        }
    }, [smartWalletPubkey]);

    useEffect(() => {
        if (isConnected && smartWalletPubkey) {
            // eslint-disable-next-line
            fetchBalance();
        }
    }, [isConnected, smartWalletPubkey, fetchBalance]);

    const requestAirdrop = async () => {
        if (!smartWalletPubkey) return;
        try {
            setAirdropStatus('loading');
            const response = await fetch(CONFIG.RPC_URL, {
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
        } catch {
            setAirdropStatus('error');
        }
    };

    const copyAddress = () => {
        if (!smartWalletPubkey) return;
        navigator.clipboard.writeText(smartWalletPubkey.toBase58());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    <button
                        onClick={copyAddress}
                        title="Click to copy full address"
                        className="group flex items-center gap-2 text-sm font-mono text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                        {smartWalletPubkey.toBase58().slice(0, 8)}...{smartWalletPubkey.toBase58().slice(-8)}
                        <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {copied ? 'Copied!' : 'Copy'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Stacked Balances */}
                <div className="text-right flex flex-col items-end">
                    <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">SOL</span>
                        <span className="text-lg font-bold">{balance !== null ? balance.toFixed(3) : '---'}</span>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">USDC</span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{usdcBalance !== null ? usdcBalance.toFixed(2) : '---'}</span>
                    </div>
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

                <div className="h-8 w-px bg-gray-200 dark:bg-zinc-700 mx-2 hidden md:block"></div>
                <ThemeToggle />
            </div>
        </div>
    );
}
