'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { ArrowDownUp, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function SwapInterface() {
    const { isConnected, wallet } = useWallet();
    const [fromAmount, setFromAmount] = useState('');
    const [isSwapping, setIsSwapping] = useState(false);

    if (!isConnected || !wallet) return null;

    const handleSwap = async () => {
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            toast.error('Invalid amount');
            return;
        }

        try {
            setIsSwapping(true);

            // Simulation of a LazorKit-integrated swap
            // In a real app, you would fetch a quote from Jupiter and build the transaction
            toast.promise(
                new Promise((resolve) => setTimeout(resolve, 3000)),
                {
                    loading: 'Building gasless swap transaction...',
                    success: () => {
                        setIsSwapping(false);
                        setFromAmount('');
                        return 'Swap Successful! 0.1 SOL -> 15.2 USDC';
                    },
                    error: 'Swap failed. Please try again.',
                }
            );
        } catch (e) {
            setIsSwapping(false);
            toast.error('Swap failed');
        }
    };

    return (
        <div className="p-8 bg-white dark:bg-zinc-900 rounded-[38px] border border-gray-100 dark:border-zinc-800 h-full">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-pink-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-pink-200 dark:shadow-none">3</span>
                Atomic Swap
            </h3>

            <div className="space-y-4">
                {/* From Field */}
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">You Pay</span>
                        <span className="text-xs text-indigo-500 font-bold">Balance: ~1.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <input
                            type="number"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            placeholder="0.0"
                            className="bg-transparent border-none focus:ring-0 text-2xl font-black w-full"
                        />
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-zinc-700">
                            <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full" />
                            <span className="font-bold text-sm">SOL</span>
                        </div>
                    </div>
                </div>

                {/* Switch Icon */}
                <div className="flex justify-center -my-6 relative z-10">
                    <button className="p-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-md hover:scale-110 transition-transform">
                        <ArrowDownUp size={16} className="text-gray-400" />
                    </button>
                </div>

                {/* To Field */}
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">You Receive</span>
                        <span className="text-xs text-gray-400 font-bold italic">~15.2 USDC</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <input
                            type="number"
                            disabled
                            placeholder="0.0"
                            className="bg-transparent border-none focus:ring-0 text-2xl font-black w-full opacity-50"
                        />
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-zinc-700">
                            <div className="w-5 h-5 bg-blue-500 rounded-full" />
                            <span className="font-bold text-sm">USDC</span>
                        </div>
                    </div>
                </div>

                {/* Info Note */}
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800">
                    <AlertCircle size={14} className="text-amber-600 dark:text-amber-500 mt-0.5" />
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-tight">
                        Swap is atomic and gasless. The LazorKit Paymaster covers the transaction fee.
                    </p>
                </div>

                <button
                    onClick={handleSwap}
                    disabled={isSwapping || !fromAmount}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isSwapping ? <RefreshCw className="animate-spin" /> : 'Swap Tokens'}
                </button>
            </div>
        </div>
    );
}
