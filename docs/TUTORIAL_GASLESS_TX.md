# Tutorial: Gasless Transactions with LazorKit

This tutorial shows how to send SOL and SPL tokens without paying gas fees using the LazorKit Paymaster.

## Prerequisites

- Completed [Passkey Login Tutorial](./TUTORIAL_PASSKEY_LOGIN.md)
- Connected wallet using `useWallet()`

## Step 1: Understand the Flow

```
User Action → Build Instruction → Paymaster Sponsors Fee → Transaction Sent
```

The LazorKit Paymaster covers all network fees, so users never need SOL for gas.

## Step 2: Basic SOL Transfer

```tsx
// src/components/TransferSOL.tsx
'use client';

import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferSOL() {
    const { signAndSendTransaction, smartWalletPubkey } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('0.1');
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        if (!smartWalletPubkey) return;
        
        setLoading(true);
        try {
            // 1. Build the transfer instruction
            const instruction = SystemProgram.transfer({
                fromPubkey: smartWalletPubkey,
                toPubkey: new PublicKey(recipient),
                lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
            });

            // 2. Sign and send (Paymaster handles gas)
            const signature = await signAndSendTransaction({
                instructions: [instruction],
                transactionOptions: {
                    feeToken: 'USDC' // Optional: specify fee token
                }
            });

            console.log('Success:', signature);
        } catch (error) {
            console.error('Transfer failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransfer} disabled={loading}>
                {loading ? 'Sending...' : 'Send Gasless'}
            </button>
        </div>
    );
}
```

## Step 3: Batch Transfers (Multiple Recipients)

Send to multiple addresses in a single atomic transaction:

```tsx
import { TransactionInstruction } from '@solana/web3.js';

const handleBatchTransfer = async (recipients: {address: string, amount: number}[]) => {
    const instructions: TransactionInstruction[] = recipients.map(r => 
        SystemProgram.transfer({
            fromPubkey: smartWalletPubkey!,
            toPubkey: new PublicKey(r.address),
            lamports: r.amount * LAMPORTS_PER_SOL,
        })
    );

    // All transfers happen in ONE transaction
    const signature = await signAndSendTransaction({
        instructions,
        transactionOptions: { feeToken: 'USDC' }
    });
};
```

## Step 4: Transaction Options

| Option | Description |
|--------|-------------|
| `feeToken: 'USDC'` | Pay fees in USDC instead of SOL |
| `feeToken: 'SOL'` | Standard SOL fee payment |
| (default) | Paymaster sponsors the fee |

## How Paymaster Works

1. **You build instructions** (what you want to do)
2. **SDK wraps them** in a sponsored transaction envelope
3. **Paymaster signs as fee payer** (covers all SOL costs)
4. **Transaction is submitted** to Solana
5. **User pays nothing** for network fees

## Error Handling

```tsx
try {
    await signAndSendTransaction({ instructions });
} catch (error) {
    if (error.message.includes('insufficient')) {
        // Handle insufficient balance
    } else if (error.message.includes('rejected')) {
        // User rejected biometric prompt
    }
}
```

## Next Steps

- Add toast notifications with [Sonner](https://sonner.emilkowal.ski/)
- Link to Solana Explorer for transaction verification
- See [LazorSwift source code](https://github.com/0xsupremedev/lazor-swift) for complete examples
