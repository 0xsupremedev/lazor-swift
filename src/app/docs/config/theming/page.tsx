import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Palette, Sun, Moon } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Theming | LazorSwift Docs',
    description: 'Customize the look and feel of your LazorSwift application',
};

export default function ThemingDocPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs/config/rpc" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to RPC
                </Link>
                <h1 className="text-3xl font-bold">Theming</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    Building a premium UI with Tailwind CSS 4.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Dark Mode</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    LazorSwift uses standard Tailwind <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">dark:</code> modifiers and the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">ThemeToggle</code> component.
                </p>
                <div className="flex gap-4">
                    <div className="flex-1 p-6 bg-white border border-zinc-200 rounded-2xl text-black">
                        <Sun className="mb-2 text-amber-500" />
                        <div className="font-bold">Light theme</div>
                        <p className="text-xs text-zinc-500">Clean, high-contrast</p>
                    </div>
                    <div className="flex-1 p-6 bg-black border border-zinc-800 rounded-2xl text-white">
                        <Moon className="mb-2 text-indigo-400" />
                        <div className="font-bold">Dark theme</div>
                        <p className="text-xs text-zinc-400">Premium, sleek black</p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Customizing Colors</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Colors are managed via the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">globals.css</code> file using Tailwind 4 CSS variables.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>{`:root {
  --primary: #6366f1; /* Indigo 500 */
  --background: #ffffff;
}

.dark {
  --primary: #818cf8; /* Indigo 400 */
  --background: #000000;
}`}</code>
                    </pre>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/config/rpc" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> RPC Info
                </Link>
                <Link href="/docs/troubleshooting" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Troubleshooting <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
