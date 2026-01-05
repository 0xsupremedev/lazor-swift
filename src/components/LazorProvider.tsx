'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { CONFIG } from '@/utils/config';

// Polyfill Buffer for Next.js
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

export function LazorProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <LazorkitProvider
            rpcUrl={CONFIG.RPC_URL}
            portalUrl={CONFIG.PORTAL_URL}
            paymasterConfig={CONFIG.PAYMASTER}
        >
            {children}
        </LazorkitProvider>
    );
}
