import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Terminal, Copy, Check } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Quick Start | LazorSwift Docs',
    description: 'Get started with LazorSwift in 5 minutes',
};

export default function QuickStartPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Quick Start</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Get LazorSwift running in under 5 minutes.
                </p>
            </div>

            {/* Prerequisites */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Prerequisites</h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                    <li><strong>Node.js 18+</strong> - Required for Next.js 15</li>
                    <li><strong>npm or pnpm</strong> - Package manager</li>
                    <li><strong>Modern browser</strong> - Chrome, Safari, Edge with WebAuthn support</li>
                </ul>
            </section>

            {/* Step 1 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Clone the Repository
                </h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <Terminal className="w-4 h-4" />
                        <span>Terminal</span>
                    </div>
                    <pre className="text-green-400 overflow-x-auto">
                        <code>{`git clone https://github.com/0xsupremedev/lazor-swift.git
cd lazor-swift`}</code>
                    </pre>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Install Dependencies
                </h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <pre className="text-green-400 overflow-x-auto">
                        <code>{`npm install`}</code>
                    </pre>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Note:</strong> If you encounter peer dependency warnings, the project is configured to handle them automatically.
                    </p>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Start Development Server
                </h2>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm">
                    <pre className="text-green-400 overflow-x-auto">
                        <code>{`npm run dev`}</code>
                    </pre>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Open <a href="http://localhost:3000" className="text-indigo-600 hover:underline">http://localhost:3000</a> in your browser.
                </p>
            </section>

            {/* Step 4 */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Try the Demo
                </h2>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-bold flex-shrink-0">✓</div>
                        <div>
                            <strong>Connect Wallet</strong>
                            <p className="text-sm text-zinc-500">Click &quot;Connect with Passkey&quot; and use your biometric (FaceID/TouchID/Windows Hello)</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-bold flex-shrink-0">✓</div>
                        <div>
                            <strong>Get Devnet SOL</strong>
                            <p className="text-sm text-zinc-500">Use the airdrop button in Session Info to fund your wallet</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-bold flex-shrink-0">✓</div>
                        <div>
                            <strong>Send Gasless Transaction</strong>
                            <p className="text-sm text-zinc-500">Try the transfer forms - no gas fees required!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Introduction
                </Link>
                <Link href="/docs/installation" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Installation <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
