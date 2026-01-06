import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code, Settings } from 'lucide-react';

export const metadata: Metadata = {
    title: 'LazorProvider | LazorSwift Docs',
    description: 'The core provider for LazorKit integration',
};

export default function ProviderPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">LazorProvider</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    The root component that manages wallet state and SDK initialization.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Usage</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Wrap your application (usually in <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">layout.tsx</code>) with the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">LazorProvider</code>.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { LazorProvider } from '@/components/LazorProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LazorProvider>
          {children}
        </LazorProvider>
      </body>
    </html>
  );
}`}</code>
                    </pre>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Configuration Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                                <th className="text-left py-3 px-4 font-semibold">Type</th>
                                <th className="text-left py-3 px-4 font-semibold">Default</th>
                                <th className="text-left py-3 px-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">rpcUrl</td>
                                <td className="py-3 px-4 text-zinc-500">string</td>
                                <td className="py-3 px-4 text-zinc-500">Devnet</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">Your Solana RPC endpoint.</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <td className="py-3 px-4 font-mono text-indigo-600">portalUrl</td>
                                <td className="py-3 px-4 text-zinc-500">string</td>
                                <td className="py-3 px-4 text-zinc-500">lazor.sh</td>
                                <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">URL for the passkey portal.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/paymaster" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Paymaster
                </Link>
                <Link href="/docs/components/connect-wallet" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    ConnectWallet <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
