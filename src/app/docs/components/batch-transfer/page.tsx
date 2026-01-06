import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'BatchTransfer | LazorSwift Docs',
    description: 'Send SOL to multiple addresses in one gasless transaction',
};

export default function BatchTransferDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/components/transfer-sol" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to TransferSOL
                </Link>
                <h1 className="text-3xl font-bold">BatchTransfer</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Send assets to up to 10 recipients in a single, atomic, gasless transaction.
                </p>
            </div>

            <section className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                    Batch processing is one of the most powerful features of Smart Wallets. By grouping multiple instructions into a single transaction, you significantly improve UX and reduce complexity.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">How to Use</h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`import { BatchTransfer } from '@/components/BatchTransfer';

export default function BulkPayments() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bulk Send</h1>
      <BatchTransfer />
    </div>
  );
}`}</code>
                    </pre>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Technical Advantage</h2>
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Atomic Execution</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                All transfers in the batch either succeed together or fail together. There is no partial success state, ensuring data consistency for financial applications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/components/transfer-sol" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> TransferSOL
                </Link>
                <Link href="/docs/components/payment-widget" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    PaymentWidget <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
