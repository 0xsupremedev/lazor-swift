# LazorSwift Technical & Security Architecture

LazorSwift provides a high-security, low-friction bridge to Solana by leveraging **Account Abstraction (ERC-4337 style, adapted for Solana)** and **WebAuthn (Passkeys)**.

---

## 1. Core Architecture Layers

| Layer | Responsibility | Security Property |
|-------|----------------|-------------------|
| **Signer Layer** (Passkeys) | Biometric authentication and transaction signing. | **Hardware-bound**: Private keys never leave the Secure Enclave (Apple) or TPM (Windows). |
| **Account Layer** (Smart Wallet) | PDA-based account that executes instructions. | **Non-Custodial**: Only the authorized Passkey can trigger actions via the LazorKit Program. |
| **Sponsorship Layer** (Paymaster) | Subsidizes the network (SOL) fees. | **Gasless**: Users don't need to hold SOL to interact with the dApp. |

---

## 2. Feature Workflows

### 🛡️ Passkey Login Flow
1. **Challenge Generation**: The app requests a unique cryptographic challenge from the LazorKit portal.
2. **Biometric Handshake**: The browser triggers the OS (FaceID/Windows Hello). The user authenticates locally.
3. **Hardware Signature**: The Secure Enclave signs the challenge using the hardware-bound private key.
4. **PDA Derivation**: The SDK takes the public key and credential ID to derive a **Smart Account PDA**.
5. **Session Initiation**: The Smart Account is now the fixed "Identity" for the user, persistent across reloads.

### ⛽ Gasless SOL Transfer Flow
1. **Instruction Building**: The user enters the recipient and amount. The app builds a standard Solana `SystemProgram.transfer` instruction.
2. **Sponsorship Request**: The SDK sends the instruction to the **LazorKit Paymaster**.
3. **Payer Signature**: The Paymaster validates the request and signs the transaction as the **Fee Payer**.
4. **User Authorization**: The user provides a quick biometric signature to authorize the actual transfer logic.
5. **Atomic Execution**: The transaction is sent to the network. The Paymaster pays the gas; the user's account sends the SOL.

### 📱 QR Payment Request Flow
1. **Dynamic Generation**: The app fetches the `smartWalletPubkey`.
2. **Payload Encoding**: Encodes the address into a standard `solana:<address>` URI scheme.
3. **Visual Conversion**: Renders a high-fidelity QR code via `qrcode.react`.
4. **Seamless Receipt**: Any mobile wallet (Phantom, Solflare) can scan the QR to send funds directly to the Smart Account.

---

## 3. Security Hardening

### Non-Custodial by Design
LazorSwift does not store your private keys. It doesn't even "see" them. The signing happens inside the **hardware chips** of your laptop or phone. If our servers were compromised, your funds would remain safe because we cannot sign transactions on your behalf.

### Anti-Phishing (Origin Binding)
Passkeys are cryptographically bound to the domain (e.g., `lazor-swift.vercel.app`). 
- **Attack Scenario**: A hacker creates `lazor-swlft-scam.com`.
- **Defense**: Your browser will refuse to show the Passkey for the fake domain, making traditional credential phishing impossible.

### Atomic Batching
Transactions are "Atomic". If you send a **Batch Transfer** to 10 people and the 10th one fails, the entire transaction is rolled back. No "partial" successes means no lost funds due to network race conditions.

### RPC Robustness
We use an **Aggregated RPC Strategy**. If the primary Devnet endpoint returns a `429` (Rate Limit) or `503` (Service Unavailable), the app handles the error gracefully with user-friendly retry states rather than crashing.

---

## 4. Developer Integration Example

```tsx
import { useWallet } from '@lazorkit/wallet';

// 1. Connect
const { connect } = useWallet();

// 2. Transact (Gasless)
const { signAndSendTransaction } = useWallet();

const tx = await signAndSendTransaction({
  instructions: [/* your instructions here */],
});
```

[Return to README](../README.md)
