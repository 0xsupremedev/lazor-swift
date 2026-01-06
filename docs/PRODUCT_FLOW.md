# LazorSwift – Gasless Solana Payments
## Passkey Smart Wallet · QR Payments · Embedded Checkout

LazorSwift is a non-custodial, passkey-based smart wallet system that enables gasless SOL & SPL token payments on Solana.

---

## 1. Core Principles
- **No seed phrases**: Eliminates the "comprehensive risk" of phishing.
- **No browser extensions**: Works natively on any modern browser.
- **No upfront SOL**: Users can start with zero balance; Paymaster covers fees.
- **Mobile + Web native**: Fully responsive and optimized for biometrics.

---

## 2. Key Features

### ✅ Passkey Login with Smart Wallet
- **WebAuthn / Passkeys**: Integrated biometric or device-bound authentication.
- **Deterministic PDA**: A unique Smart Account is derived for every user.
- **Hidden Complexity**: No private keys or mnemonics are ever exposed to the user.

### ✅ Gasless SOL Transfers
- **Fee Sponsorship**: Integrated Paymaster automatically covers network costs.
- **USDC & Token Support**: Native support for SPL token transfers.
- **Atomic Execution**: All instructions (transfer + metadata) happen in a single transaction.

### ✅ QR Code Payment Requests
- **Merchant Utility**: Instantly generates payment-ready QR codes.
- **Solana Pay Compatible**: Follows the industry standard URI scheme.
- **Cross-Device**: Facilitates easy "Scan & Pay" from mobile wallets like Phantom.

### ✅ Embeddable "Pay with Solana" Widget
- **Drop-in Component**: Single line of code for merchant integration.
- **Unified Logic**: Handles auth, wallet state, and transaction tracking.
- **Zero Popup**: No intrusive extension popups required.

---

## 3. Product & Technical Flow

### A. The Onboarding Flow (First-Time User)
1.  **Merchant Checkout**: User clicks "Pay with Solana".
2.  **Portal Handshake**: App redirects to `portal.lazor.sh`.
3.  **Passkey Creation**:
    - Browser triggers **WebAuthn Create**.
    - **TPM/Secure Enclave** generates a hardware-bound key pair.
    - **Public Key** is sent to Lazor; **Private Key** never leaves the device hardware.
4.  **Smart Wallet Activation**:
    - A **Program Derived Address (PDA)** is calculated.
    - The hardware key is set as the sole authority for this account.

### B. The Gasless Payment Flow
1.  **Instruction Building**: App generates the transfer instructions (Recipient, Amount, Memo).
2.  **Paymaster Request**: App requests fee sponsorship from the LazorKit Paymaster.
3.  **User Authorization**: User confirms the transaction via a quick biometric scan.
4.  **Sponsorship & Submission**:
    - Paymaster signs as the **Fee Payer**.
    - Transaction is submitted to Solana.
5.  **Settlement**: User sees a success toast; merchant receives funds.

---

## 4. Security Architecture

### sign-on Security
- **Origin Binding**: Passkeys are cryptographically tied to the domain, rendering phishing sites useless.
- **Hardware-Backed**: Authentication happens in the device's isolated security chip.

### Non-Custodial Integrity
- **No Custody**: LazorSwift servers never hold or "see" private keys.
- **Limited Sponsorship**: Paymaster only has authority to pay fees, not to authorize transfers.

### Robustness
- **Atomic Rollback**: Transactions either succeed 100% or fail safely with no partial execution.
- **Replay Protection**: Built-in nonces and sequence tracking prevent transaction duplication.

---

## 5. Ideal Use Cases
- **Web3 Checkout**: Replace complex extension flows with a "One-Click" buy.
- **SaaS Subscriptions**: Automated USDC billing powered by smart wallets.
- **Direct Tips/Payments**: Social media and content creator tipping.
- **Physical Stores**: Dynamic QR codes for in-person SOL payments.

---

[Back to README](../README.md) | [Go to Tutorials](../docs/TUTORIAL_PASSKEY_LOGIN.md)
