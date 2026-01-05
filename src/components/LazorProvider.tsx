'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';

// Polyfill Buffer for Next.js
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || require('buffer').Buffer;
}

const CONFIG = {
    DEVNET: {
        RPC_URL: "https://api.devnet.solana.com",
        PORTAL_URL: "https://portal.lazor.sh",
        PAYMASTER: { paymasterUrl: "https://kora.devnet.lazorkit.com" }
    },
    MAINNET: {
        RPC_URL: "https://api.mainnet-beta.solana.com",
        // Placeholder - verify mainnet URLs in production
        PORTAL_URL: "https://portal.lazor.sh",
        PAYMASTER: { paymasterUrl: "https://kora.lazorkit.com" }
    }
};

// Toggle this for Mainnet
const CURRENT_ENV = CONFIG.DEVNET;

export function LazorProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <LazorkitProvider
            rpcUrl={CURRENT_ENV.RPC_URL}
            portalUrl={CURRENT_ENV.PORTAL_URL}
            paymasterConfig={CURRENT_ENV.PAYMASTER}
        >
            {children}
        </LazorkitProvider>
    );
}
