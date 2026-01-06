'use client';

import { LazorProvider } from '@/components/LazorProvider';
import { ConnectWallet } from '@/components/ConnectWallet';
import { TransferSOL } from '@/components/TransferSOL';
import { TransferUSDC } from '@/components/TransferUSDC';
import { PaymentWidget } from '@/components/PaymentWidget';
import { SessionInfo } from '@/components/SessionInfo';
import { SecuritySection } from '@/components/SecuritySection';
import { ActivityFeed } from '@/components/ActivityFeed';
import { RequestPayment } from '@/components/RequestPayment';
import { BatchTransfer } from '@/components/BatchTransfer';
import { PasskeySettings } from '@/components/PasskeySettings';
import { SwapInterface } from '@/components/SwapInterface';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <LazorProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
        {/* Navbar */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="currentColor" />
              <span className="font-bold text-xl tracking-tight">LazorSwift</span>
            </div>
            <ConnectWallet />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-white dark:bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              Passkey Native.<br />Gasless Forever.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              The ultimate onboarding experience for Solana. <br className="hidden md:block" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">No seed phrases. No gas fees. No friction.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="#demo" className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20">
                Try Live Demo
              </a>
              <a href="https://github.com/0xsupremedev/lazor-swift" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gray-100 dark:bg-zinc-900 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all border border-gray-200 dark:border-zinc-800">
                View Source
              </a>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 border-y border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-gray-500 max-w-xl mx-auto">LazorKit abstracts the complexity of Web3 using Account Abstraction and Passkeys.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create Wallet", desc: "User signs up using FaceID, TouchID, or Windows Hello. A secure Passkey is created locally." },
                { step: "02", title: "Deploy Smart Account", desc: "A PDA-based Smart Account is deployed on Solana, controlled by the Passkey." },
                { step: "03", title: "Transact Gasless", desc: "Transactions are signed with Passkeys and sponsored by the Lazor Paymaster." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                  <span className="text-indigo-500 font-black text-4xl opacity-20 block mb-4">{item.step}</span>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section (Phase 2) */}
        <SecuritySection />

        {/* Demo Section */}
        <section id="demo" className="py-24 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Interactive Demo</h2>
                <p className="text-gray-500 text-lg">Experience the full power of Passkey-native accounts on Solana Devnet.</p>
              </div>
              <SessionInfo />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-12">
                {/* Transfers Column */}
                <div className="p-1 shadow-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-[40px]">
                  <div className="p-8 bg-white dark:bg-zinc-900 rounded-[38px] border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none">1</span>
                      Gasless Transfers
                    </h3>
                    <div className="grid grid-cols-1 gap-8">
                      <TransferSOL />
                      <TransferUSDC />
                      <BatchTransfer />
                    </div>
                  </div>
                </div>

                {/* Swap Interface */}
                <div className="p-1 shadow-2xl bg-gradient-to-bl from-pink-500/10 via-indigo-500/10 to-transparent rounded-[40px]">
                  <SwapInterface />
                </div>

                {/* Activity Feed */}
                <ActivityFeed />
              </div>

              <div className="lg:col-span-5 space-y-12">
                {/* Embeddable Widget Column */}
                <div className="p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-[40px] border border-gray-100 dark:border-zinc-800 lg:sticky lg:top-24">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-200 dark:shadow-none">2</span>
                    Embeddable Payments
                  </h3>
                  <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                    Integrate high-conversion payments into your app with just a single component.
                  </p>
                  <div className="flex justify-center mb-12">
                    <PaymentWidget recipient="LazorSwiftDemoAddress123" />
                  </div>

                  {/* Request Payment Utility */}
                  <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 space-y-8">
                    <RequestPayment />
                    <PasskeySettings />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-gray-100 dark:border-zinc-900 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="currentColor" />
              <span className="font-bold text-xl tracking-tight">LazorSwift</span>
            </div>
            <p className="text-gray-500 text-sm">Built for the LazorKit Bounty by 0xsupremedev</p>
            <div className="mt-8 flex justify-center gap-6">
              <Link href="/docs" className="text-gray-400 hover:text-gray-600 transition-colors">Documentation</Link>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </LazorProvider>
  );
}
