'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Monitor, Smartphone, Plus, Shield, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function PasskeySettings() {
    const { isConnected, wallet } = useWallet();
    const [showRegisterWindows, setShowRegisterWindows] = useState(false);

    if (!isConnected || !wallet) return null;

    const handleAddDevice = () => {
        toast.info('Secure Registration Initialized', {
            description: 'Please follow the system prompt to register your Windows Hello device.'
        });
        // In a real implementation, this would trigger the @lazorkit/wallet registration flow
        // For the demo, we show the guidance modal
        setShowRegisterWindows(true);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="text-indigo-600" size={20} />
                        Passkey Management
                    </h3>
                    <p className="text-sm text-gray-500">Manage hardware keys bound to your Smart Account</p>
                </div>
                <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-100 dark:border-green-800">
                    2FA ENABLED
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {/* Active Device */}
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
                            <Smartphone size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">This Device (Primary)</p>
                            <p className="text-xs text-gray-500">Registered via Secure Enclave</p>
                        </div>
                    </div>
                    <CheckCircle2 size={18} className="text-green-500" />
                </div>

                {/* Windows Placeholder */}
                <button
                    onClick={handleAddDevice}
                    className="w-full flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Monitor size={20} className="text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-indigo-600">Add Windows Device</p>
                            <p className="text-xs text-indigo-500/70">Register with Windows Hello</p>
                        </div>
                    </div>
                    <Plus size={18} className="text-indigo-600" />
                </button>
            </div>

            {showRegisterWindows && (
                <div className="mt-6 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white animate-in zoom-in-95 duration-300">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Monitor size={16} className="text-indigo-400" />
                        Registering Windows Hello
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        To add your Windows device, LazorKit uses the WebAuthn standard. Ensure "Windows Hello" is set up in your system settings.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[10px] text-gray-400">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">1</div>
                            Confirm biometric prompt on this device
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">2</div>
                            Smart Account permissions updated on-chain
                        </div>
                    </div>
                    <button
                        onClick={() => setShowRegisterWindows(false)}
                        className="mt-6 w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Got it, proceed
                    </button>
                </div>
            )}
        </div>
    );
}
