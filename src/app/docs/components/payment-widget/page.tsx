import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CreditCard, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'PaymentWidget | LazorSwift Docs',
    description: 'Embeddable checkout widget for gasless Solana payments',
};

export default function PaymentWidgetDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/components/batch-transfer" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to BatchTransfer
                </Link>
                <h1 className="text-3xl font-bold">PaymentWidget</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    A ready-to-use checkout widget for one-click Solana payments.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    The <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">PaymentWidget</code> is designed for commerce applications. It abstracts away the complexity of transaction building and signing, providing a smooth &quot;Pay with Lazor&quot; experience.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Props</h2>
                <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold">Prop</th>
                                <th className="text-left py-4 px-6 font-semibold">Type</th>
                                <th className="text-left py-4 px-6 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            <tr>
                                <td className="py-4 px-6 font-mono text-indigo-600">to</td>
                                <td className="py-4 px-6 text-zinc-500">string</td>
                                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">The recipient&apos;s public key.</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-indigo-600">amount</td>
                                <td className="py-4 px-6 text-zinc-500">number</td>
                                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">The amount of SOL to charge.</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-indigo-600">label</td>
                                <td className="py-4 px-6 text-zinc-500">string</td>
                                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">Title displayed on the widget.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Usage</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { PaymentWidget } from '@/components/PaymentWidget';

export function Checkout() {
  return (
    <PaymentWidget 
      to="MERCHANT_ADRESS"
      amount={0.5}
      label="Buy Premium Plan"
    />
  );
}`}</code>
                    </pre>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/components/batch-transfer" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> BatchTransfer
                </Link>
                <Link href="/docs/config/env" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Environment Setup <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
