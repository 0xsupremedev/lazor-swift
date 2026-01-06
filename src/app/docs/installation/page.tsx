import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Package, Terminal } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Installation | LazorSwift Docs',
    description: 'Install LazorKit SDK and dependencies',
};

export default function InstallationPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Installation</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Install LazorKit SDK and configure your project.
                </p>
            </div>

            {/* NPM Install */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    Install Packages
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Install the LazorKit wallet SDK and Solana web3.js:
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <pre className="text-green-400 overflow-x-auto">
                        <code>{`npm install @lazorkit/wallet @solana/web3.js`}</code>
                    </pre>
                </div>
            </section>

            {/* Package Details */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Package Overview</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                <th className="text-left py-3 px-4 font-semibold">Package</th>
                                <th className="text-left py-3 px-4 font-semibold">Purpose</th>
                                <th className="text-left py-3 px-4 font-semibold">Version</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">@lazorkit/wallet</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">Passkey authentication and smart wallet SDK</td>
                                <td className="py-3 px-4 font-mono">^2.0.1</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">@solana/web3.js</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">Solana blockchain interactions</td>
                                <td className="py-3 px-4 font-mono">^1.98.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Peer Dependencies */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Peer Dependencies</h2>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Important:</strong> If you encounter peer dependency conflicts with <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">@coral-xyz/anchor</code>, add this to your <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">.npmrc</code>:
                    </p>
                    <div className="mt-3 bg-zinc-900 rounded-lg p-3 font-mono text-sm">
                        <pre className="text-green-400">
                            <code>{`legacy-peer-deps=true`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* TypeScript */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">TypeScript Support</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    LazorKit is fully typed. No additional <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">@types</code> packages are needed.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <pre className="text-blue-400 overflow-x-auto">
                        <code>{`// Types are automatically available
import { useWallet } from '@lazorkit/wallet';

const { smartWalletPubkey } = useWallet();
// smartWalletPubkey is typed as PublicKey | null`}</code>
                    </pre>
                </div>
            </section>

            {/* Framework Support */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Framework Compatibility</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">⚡</div>
                        <h3 className="font-bold">Next.js</h3>
                        <p className="text-sm text-zinc-500">13+ (App Router)</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">⚛️</div>
                        <h3 className="font-bold">Vite + React</h3>
                        <p className="text-sm text-zinc-500">React 18+</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">📱</div>
                        <h3 className="font-bold">React Native</h3>
                        <p className="text-sm text-zinc-500">Expo SDK 50+</p>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/quickstart" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Quick Start
                </Link>
                <Link href="/docs/passkey-auth" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Passkey Authentication <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
