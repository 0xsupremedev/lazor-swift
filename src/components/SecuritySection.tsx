'use client';

import { Fingerprint, Lock, ShieldCheck } from 'lucide-react';

export function SecuritySection() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 tracking-tight">Security without Compromise</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Passkeys on Solana combine high-grade hardware security with the seamless experience users expect from modern apps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Hardware Security */}
                    <div className="p-8 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                            <Fingerprint size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Hardware-Bound</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Private keys never leave your device's Secure Enclave. Biometric auth (FaceID/TouchID) ensures only you can sign transactions.
                        </p>
                    </div>

                    {/* Anti-Phishing */}
                    <div className="p-8 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                            <ShieldCheck size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Phishing Resistant</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Unlike seed phrases, Passkeys are bound to the domain. An attacker can't trick you into entering them on a fake site.
                        </p>
                    </div>

                    {/* Smart Account Control */}
                    <div className="p-8 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6">
                            <Lock size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Smart Account Control</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your Passkey controls a PDA-based Smart Account (AA), enabling gas sponsorship and granular permission management.
                        </p>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-20 overflow-hidden bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h3 className="text-2xl font-bold">Passkeys vs. Seed Phrases</h3>
                        <p className="text-gray-500 text-sm">Why the world is moving away from 12-word recovery codes.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-zinc-500 text-xs font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                                    <th className="px-8 py-5">Feature</th>
                                    <th className="px-8 py-5 text-indigo-600 dark:text-indigo-400">Passkeys (LazorSwift)</th>
                                    <th className="px-8 py-5">Seed Phrases</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                                <tr>
                                    <td className="px-8 py-6 font-medium">Onboarding</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Instant (Biometrics)</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Slow (Write down 12 words)</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 font-medium">Phishing Risk</td>
                                    <td className="px-8 py-6 text-sm text-emerald-600 dark:text-emerald-400 font-bold">Immune</td>
                                    <td className="px-8 py-6 text-sm text-red-600 dark:text-red-400 font-bold">Critical</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 font-medium">Security Storage</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Hardware Secure Enclave</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Paper or Digital text</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-6 font-medium">Gas Fees</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Sponsored (Gasless)</td>
                                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">Manual (Requires SOL)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
