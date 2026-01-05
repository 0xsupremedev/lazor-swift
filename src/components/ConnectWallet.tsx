'use client';

import { useWallet } from '@lazorkit/wallet';

export function ConnectWallet() {
    const { connect, disconnect, isConnected, isConnecting, wallet } = useWallet();

    if (isConnected && wallet) {
        return (
            <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
                Disconnect ({wallet.smartWallet.slice(0, 6)}...{wallet.smartWallet.slice(-4)})
            </button>
        );
    }

    return (
        <button
            onClick={() => connect()}
            disabled={isConnecting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
    );
}
