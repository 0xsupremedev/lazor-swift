# 🧪 End-to-End Verification Guide

This guide ensures that the LazorSwift platform is functioning correctly on real hardware with biometric authentication.

## 📱 Prerequisites
- A device with biometrics (Windows Hello, FaceID, or TouchID).
- A modern browser (Chrome, Safari, Edge) that supports WebAuthn.
- Connection to Solana Devnet.

## 🛠️ Step-by-Step Test Plan

### 1. Account Creation (Passkey Login)
1. Navigate to [lazor-swift.vercel.app](https://lazor-swift.vercel.app).
2. Click **Connect Wallet** in the top right.
3. Observe the biometric prompt from your OS/Browser.
4. Authenticate (Scan face/finger or enter PIN).
5. **Success Criteria**: The button should now display `Disconnect (XXXX...XXXX)`.

### 2. Funding the Smart Account
1. Scroll down to the **Interactive Demo** section.
2. Locate the **Session Info** card.
3. Click **Get Devnet SOL**.
4. **Success Criteria**: A toast notification should appear, and your SOL balance should update to `1.00`.

### 3. Gasless SOL Transfer
1. Locate the **Gasless SOL Transfer** component.
2. Enter a valid recipient address (e.g., your phantom wallet or `LazorSwiftDemoAddress...`).
3. Enter `0.1` as the amount.
4. Click **Send SOL (Gasless)**.
5. Authenticate via biometric prompt.
6. **Success Criteria**: A success toast appears with a transaction signature. Your balance decreases by exactly `0.1` (no gas fee deducted).

### 4. Cross-Device (Windows) Test
1. If on a mobile device, scroll to **Passkey Management**.
2. Click **Add Windows Device**.
3. Observe the guidance and simulated registration flow.
4. **Success Criteria**: The UI provides clear instructions on how to sync devices.

### 5. Documentation & Search
1. Navigate to `/docs`.
2. Use the search bar to find "Paymaster".
3. **Success Criteria**: The search results update instantly and lead to the correct page.

## 🚩 Troubleshooting
- **Biometric fail**: Ensure your browser has permission to access your device's security key.
- **RPC 503**: Refresh the page; Devnet RPCs are sometimes rate-limited.
