import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Fingerprint, Shield, Key } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Passkey Authentication | LazorSwift Docs',
    description: 'Learn how passkey authentication works with LazorKit',
};

export default function PasskeyAuthPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Passkey Authentication</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Secure, passwordless authentication using WebAuthn and biometrics.
                </p>
            </div>

            {/* What are Passkeys */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">What are Passkeys?</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Passkeys are a modern authentication standard (WebAuthn) that replaces passwords with cryptographic key pairs stored in your device&apos;s secure enclave. They provide:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <Fingerprint className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                        <h3 className="font-bold mb-1">Biometric Auth</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">FaceID, TouchID, or Windows Hello</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                        <h3 className="font-bold mb-1">Phishing Resistant</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Keys are domain-bound and cannot be stolen</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
                        <Key className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                        <h3 className="font-bold mb-1">No Seed Phrases</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Private keys never leave the secure enclave</p>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">How It Works with LazorKit</h2>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-bold">User clicks &quot;Connect&quot;</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Your app calls <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">connect()</code> from useWallet hook</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-bold">Browser prompts for biometric</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">User authenticates with FaceID/TouchID/Windows Hello</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-bold">Passkey signs challenge</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Cryptographic signature proves ownership without exposing private key</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">4</div>
                        <div>
                            <h4 className="font-bold">Smart Wallet PDA returned</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">LazorKit derives a unique Solana address (PDA) from the passkey</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Implementation</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`'use client';

import { useWallet } from '@lazorkit/wallet';

export function ConnectButton() {
    const { 
        connect, 
        disconnect, 
        isConnected, 
        smartWalletPubkey 
    } = useWallet();

    if (isConnected && smartWalletPubkey) {
        return (
            <div>
                <p>Connected: {smartWalletPubkey.toBase58()}</p>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        );
    }

    return (
        <button onClick={connect}>
            Connect with Passkey
        </button>
    );
}`}</code>
                    </pre>
                </div>
            </section>

            {/* Security */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Security Model</h2>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Non-Custodial by Design</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 list-disc list-inside">
                        <li>Private keys are generated in the device&apos;s Secure Enclave</li>
                        <li>Keys never leave the device or get transmitted over the network</li>
                        <li>Each website gets a unique key pair (domain isolation)</li>
                        <li>LazorKit servers never have access to your private keys</li>
                    </ul>
                </div>
            </section>

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/installation" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Installation
                </Link>
                <Link href="/docs/smart-wallets" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Smart Wallets <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
