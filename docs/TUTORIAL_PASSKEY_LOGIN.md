# Tutorial: Passkey-Based Wallet Login with LazorKit

This tutorial shows how to integrate passkey authentication into your Solana dApp using the LazorKit SDK.

## Prerequisites

- Node.js 18+
- A Next.js or React project
- Basic knowledge of React hooks

## Step 1: Install Dependencies

```bash
npm install @lazorkit/wallet @solana/web3.js
```

## Step 2: Set Up the Provider

Wrap your app with the `LazorkitProvider`:

```tsx
// src/components/LazorProvider.tsx
'use client';

import { LazorkitProvider } from '@lazorkit/wallet';
import { useState, useEffect, ReactNode } from 'react';

const PORTAL_URL = 'https://portal.lazor.sh';

export function LazorProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <LazorkitProvider portalUrl={PORTAL_URL}>
            {children}
        </LazorkitProvider>
    );
}
```

Add to your layout:

```tsx
// src/app/layout.tsx
import { LazorProvider } from '@/components/LazorProvider';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <LazorProvider>{children}</LazorProvider>
            </body>
        </html>
    );
}
```

## Step 3: Create the Connect Button

```tsx
// src/components/ConnectWallet.tsx
'use client';

import { useWallet } from '@lazorkit/wallet';

export function ConnectWallet() {
    const { 
        connect, 
        disconnect, 
        isConnected, 
        smartWalletPubkey 
    } = useWallet();

    if (isConnected && smartWalletPubkey) {
        return (
            <div>
                <p>Connected: {smartWalletPubkey.toBase58().slice(0, 8)}...</p>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        );
    }

    return (
        <button onClick={connect}>
            Connect with Passkey
        </button>
    );
}
```

## Step 4: How It Works

1. **User clicks "Connect with Passkey"**
2. **Browser triggers biometric prompt** (FaceID/TouchID/Windows Hello)
3. **Passkey signs a challenge** from the LazorKit portal
4. **SDK returns a Smart Wallet PDA** derived from the passkey credential
5. **User is now authenticated** - no seed phrase needed!

## Step 5: Access Wallet State Anywhere

```tsx
import { useWallet } from '@lazorkit/wallet';

function MyComponent() {
    const { isConnected, smartWalletPubkey } = useWallet();
    
    if (!isConnected) {
        return <p>Please connect your wallet</p>;
    }
    
    return <p>Your address: {smartWalletPubkey?.toBase58()}</p>;
}
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Passkey** | Hardware-bound credential (WebAuthn) stored in Secure Enclave |
| **Smart Wallet PDA** | Program Derived Address controlled by your passkey |
| **Non-Custodial** | Keys never leave the user's device |

## Next Steps

- [Tutorial: Gasless Transactions](./TUTORIAL_GASLESS_TX.md)
- [LazorKit Docs](https://docs.lazorkit.com/)
