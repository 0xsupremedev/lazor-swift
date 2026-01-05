# ⚡ LazorSwift

**The fastest way to build Passkey-native Solana apps.**

Built for the **LazorKit Bounty**, this project demonstrates a premium, high-conversion onboarding flow using biometric authentication and gasless transactions.

## 🚀 Key Features

- **🔑 Seedless Onboarding**: Securely login with FaceID, TouchID, or Windows Hello.
- **⛽ Gasless Transfers**: Full sponsorship for SOL and token transactions.
- **👛 Smart Accounts**: PDA-based accounts controlled by local Passkeys.
- **💸 USDC Gas Payments**: Option to pay gas fees in USDC (Pay-with-Token).
- **🧩 Embeddable Widget**: A ready-to-use "Pay with Lazor" component for any React app.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14/15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Wallet**: [@lazorkit/wallet](https://docs.lazorkit.com/)
- **Blockchain**: Solana (Devnet)

## 🏁 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/0xsupremedev/lazor-swift.git
   cd lazor-swift
   npm install
   ```

2. **Run Dev Server**
   ```bash
   npm run dev
   ```

3. **Try the Demo**
   - Connect your wallet using Passkey.
   - Use the **Session Info** card to grab some Devnet SOL.
   - Send gasless SOL and USDC transfers.
   - Explore the embeddable payment widget.

## 📦 Components

### `<ConnectWallet />`
Ready-to-use button handling the entire Passkey registration/login flow.

### `<SessionInfo />`
Live dashboard for the user's Smart Account, including balance and devnet airdrop integration.

### `<PaymentWidget />`
Premium, customizable payment card with built-in code snippet generator for developers.

### `<TransferSOL />` / `<TransferUSDC />`
Transactional components showcasing complex instruction signing and gas sponsorship.

## 🤝 Submission
This project is a submission for the **LazorKit SDK Bounty**. It focuses on demonstrating the SDK's power in a production-ready, aesthetically pleasing interface.

## 📄 License
MIT
