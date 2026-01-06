import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MousePointer } from 'lucide-react';

export const metadata: Metadata = {
    title: 'ConnectWallet | LazorSwift Docs',
    description: 'Component for passkey-native wallet connection',
};

export default function ConnectWalletDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/components/provider" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Provider
                </Link>
                <h1 className="text-3xl font-bold">ConnectWallet</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    A drop-in component that handles the connection lifecycle.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Example</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { ConnectWallet } from '@/components/ConnectWallet';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ConnectWallet />
    </div>
  );
}`}</code>
                    </pre>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                    <li>Automatically detects if Passkeys are supported</li>
                    <li>Handles biometric prompts</li>
                    <li>Displays smart wallet address once connected</li>
                    <li>Supports dark mode out of the box</li>
                </ul>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/components/provider" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> LazorProvider
                </Link>
                <Link href="/docs/components/transfer-sol" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    TransferSOL <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
