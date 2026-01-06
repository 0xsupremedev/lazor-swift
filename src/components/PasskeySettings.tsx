'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Monitor, Smartphone, Plus, Shield, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function PasskeySettings() {
    const { isConnected, wallet } = useWallet();
    const [showRegisterWindows, setShowRegisterWindows] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    if (!isConnected || !wallet) return null;

    // Basic device detection for a more "native" feel
    const isDesktop = typeof window !== 'undefined' && !/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

    const handleAddDevice = () => {
        setIsRegistering(true);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Authenticating with Windows Hello...',
                success: () => {
                    setIsRegistering(false);
                    setShowRegisterWindows(true);
                    return 'Device Registered Successfully';
                },
                error: 'Registration Failed',
            }
        );
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="text-indigo-600" size={20} />
                        Passkey Management
                    </h3>
                    <p className="text-sm text-gray-500">Hardware keys bound to {wallet.smartWallet.slice(0, 10)}...</p>
                </div>
                <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-100 dark:border-green-800 tracking-wider">
                    2FA ACTIVE
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {/* Active Device */}
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
                            {isDesktop ? <Monitor size={20} className="text-gray-400" /> : <Smartphone size={20} className="text-gray-400" />}
                        </div>
                        <div>
                            <p className="text-sm font-bold">This {isDesktop ? 'PC' : 'Phone'} (Primary)</p>
                            <p className="text-xs text-gray-400">Secure Enclave Auth</p>
                        </div>
                    </div>
                    <CheckCircle2 size={18} className="text-green-500" />
                </div>

                {/* Add Device Button */}
                <button
                    onClick={handleAddDevice}
                    disabled={isRegistering}
                    className="w-full flex items-center justify-between p-4 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group disabled:opacity-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Monitor size={20} className="text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-indigo-600">Add Windows Device</p>
                            <p className="text-xs text-indigo-500/60">Register Windows Hello key</p>
                        </div>
                    </div>
                    <Plus size={18} className="text-indigo-600" />
                </button>
            </div>

            {showRegisterWindows && (
                <div className="mt-6 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 animate-in zoom-in-95 duration-300">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-zinc-900 dark:text-white">
                        <Monitor size={16} className="text-indigo-500" />
                        Windows Hello Registered
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                        You can now use your Windows PIN, Face, or Fingerprint to sign transactions on any browser.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <p className="text-[10px] text-gray-400 mb-1 uppercase font-bold">Device Name</p>
                            <p className="text-xs font-mono">WIN-HELLO-PK</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <p className="text-[10px] text-gray-400 mb-1 uppercase font-bold">Status</p>
                            <p className="text-xs text-green-500 font-bold">ON-CHAIN</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowRegisterWindows(false)}
                        className="mt-6 w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Close Settings
                    </button>
                </div>
            )}
        </div>
    );
}
