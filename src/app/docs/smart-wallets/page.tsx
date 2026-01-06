import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield, Database, Cpu } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Smart Wallets | LazorSwift Docs',
    description: 'Understanding Smart Accounts and PDAs in LazorKit',
};

export default function SmartWalletsPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/docs" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <h1 className="text-3xl font-bold">Smart Wallets (Account Abstraction)</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                    How LazorKit uses Program Derived Addresses (PDAs) to create secure, programmable accounts.
                </p>
            </div>

            <section className="space-y-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                    Unlike traditional wallets where your address is derived directly from a private key, LazorKit uses <span className="text-zinc-900 dark:text-white font-medium">Account Abstraction</span>.
                </p>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">The Concept</h3>
                    <p className="text-sm">
                        Your wallet address is a <strong>PDA (Program Derived Address)</strong> on the Solana blockchain. This account is owned by the LazorKit program and can only be accessed if a valid biometric signature from your passkey is provided.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Key Advantages</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            Programmable Security
                        </div>
                        <p className="text-sm text-zinc-500">Define custom logic like spending limits or multi-sig directly on the account.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                            <Cpu className="w-5 h-5 text-indigo-500" />
                            Session Management
                        </div>
                        <p className="text-sm text-zinc-500">Grant temporary permissions to apps without exposing your main keys.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Derivation Logic</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The Smart Wallet address is deterministic. Given a Passkey Credential ID and the LazorKit Program ID, the SDK can always compute the same public key.
                </p>
                <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">
                        <code>{`// Theoretical derivation
const [address, bump] = await PublicKey.findProgramAddress(
  [Buffer.from("lazor_wallet"), credentialId],
  LAZOR_PROGRAM_ID
);`}</code>
                    </pre>
                </div>
            </section>

            <div className="flex justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/docs/passkey-auth" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                    <ArrowLeft className="w-4 h-4" /> Passkey Auth
                </Link>
                <Link href="/docs/gasless" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    Gasless Transactions <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
