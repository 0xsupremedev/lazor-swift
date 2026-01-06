import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Settings, Server, Lock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Environment Variables | LazorSwift Docs',
    description: 'Configure your environment for LazorSwift',
};

export default function EnvConfigPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Environment Variables</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Configuration options for your production and development environments.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Reference</h2>
                <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold">Variable</th>
                                <th className="text-left py-4 px-6 font-semibold">Description</th>
                                <th className="text-left py-4 px-6 font-semibold">Default</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            <tr>
                                <td className="py-4 px-6 font-mono text-indigo-600">NEXT_PUBLIC_RPC_URL</td>
                                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">Your Solana RPC endpoint.</td>
                                <td className="py-4 px-6 text-zinc-500">api.devnet.solana.com</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-indigo-600">NEXT_PUBLIC_LAZOR_PORTAL_URL</td>
                                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">Passkey auth portal URL.</td>
                                <td className="py-4 px-6 text-zinc-500">https://portal.lazor.sh</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Production Setup</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    When deploying to Vercel or other platforms, ensure you set these values in your project settings.
                </p>
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
                    <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Important!</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        Always use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">NEXT_PUBLIC_</code> prefix for variables that need to be accessible on the client side.
                    </p>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/components/payment-widget" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> PaymentWidget
                </Link>
                <Link href="/docs/config/rpc" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    RPC Configuration <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
