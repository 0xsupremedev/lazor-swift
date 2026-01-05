# ⚡ LazorSwift - Submission for LazorKit Bounty

## 🚀 The Problem
Traditional crypto onboarding is broken.
- **Seed Phrases**: Users lose them or get phished.
- **Gas Fees**: New users don't have SOL to pay for transactions.
- **Complexity**: Wallet popups and approvals break immersion.

## 💡 The Solution: LazorSwift
LazorSwift demonstrates a **Passkey-native** experience on Solana.
- **Biometric Login**: No seeds. Just FaceID/TouchID.
- **Zero Gas**: Everything is sponsored via LazorKit Paymaster.
- **Instant**: Transactions sign in milliseconds.

## 🛠️ Technical Implementation
Built with **Next.js 15**, **Tailwind 4**, and **@lazorkit/wallet**.

### Key Features
1. **Smart Account Session**: We use `useWallet()` to manage a PDA-based Smart Account that persists via Passkeys.
2. **Gasless Paymaster**: All `SystemProgram.transfer` and `splToken.transfer` instructions are wrapped in a sponsored transaction envelope.
3. **Real-time Activity**: The `ActivityFeed` component polls the Solana RPC to show instant confirmation of on-chain actions.
4. **PWA-Ready**: configured with `manifest.json` for a native app experience.

## 🔗 Links
- **Live Demo**: [lazor-swift.vercel.app](https://lazor-swift.vercel.app)
- **Repository**: [github.com/0xsupremedev/lazor-swift](https://github.com/0xsupremedev/lazor-swift)
- **Video Walkthrough**: [Link to Video] (Optional)
