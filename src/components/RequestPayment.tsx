'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';
import { Copy, Check, QrCode, Share2 } from 'lucide-react';

export function RequestPayment() {
    const { smartWalletPubkey, isConnected } = useWallet();
    const [copied, setCopied] = useState(false);

    if (!isConnected || !smartWalletPubkey) return null;

    const address = smartWalletPubkey.toBase58();
    const shareUrl = `https://explorer.solana.com/address/${address}?cluster=devnet`;

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-50 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 font-bold">
                    <QrCode size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Payment</h3>
                <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                    Share your Smart Account address to receive SOL or tokens on Devnet.
                </p>

                {/* Simulated QR Code Area */}
                <div className="w-48 h-48 bg-zinc-50 dark:bg-black rounded-3xl border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-8 relative group">
                    <div className="w-40 h-40 bg-white grid grid-cols-4 grid-rows-4 gap-1 p-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {Array.from({ length: 16 }).map((_x, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}></div>
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                        <span className="text-xs font-bold text-black dark:text-white uppercase tracking-tighter bg-white dark:bg-black px-3 py-1 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700">Scan to Pay</span>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700">
                        <code className="text-[10px] md:text-sm font-mono text-gray-600 dark:text-gray-400 truncate flex-1 block">
                            {address}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-colors text-indigo-600"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>

                    <button className="w-full py-3 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Share2 size={18} />
                        Share Payment Link
                    </button>
                </div>
            </div>
        </div>
    );
}
