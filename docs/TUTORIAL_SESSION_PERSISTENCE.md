# Tutorial: Session Persistence across Devices & Reloads

One of the biggest advantages of Passkeys is their native persistence. This tutorial explains how LazorKit handles session staying power and how you can support multiple devices.

## 1. Automatic Persistence

The `@lazorkit/wallet` SDK automatically handles session persistence using local storage and encrypted state within the browser's context.

### How it works:
- When a user connects via Passkey, the SDK caches the **Smart Wallet PDA**.
- On page reload, the `isConnected` state is automatically restored if a valid session exists.
- The `LazorkitProvider` handles the lifecycle of this connection.

## 2. Implementation

You don't need to write manual `localStorage` logic. Simply use the `isConnected` flag:

```tsx
'use client';
import { useWallet } from '@lazorkit/wallet';

export function PersistentProfile() {
  const { isConnected, wallet, isConnecting } = useWallet();

  if (isConnecting) return <p>Restoring session...</p>;

  return isConnected ? (
    <p>Welcome back, {wallet.smartWallet.slice(0, 6)}</p>
  ) : (
    <p>Please log in</p>
  );
}
```

## 3. Support Multiple Devices (Sync)

Because Passkeys are linked to the user's OS account (iCloud Keychain, Google Password Manager, or Windows Hello), they can be synchronized across devices automatically.

### Enabling Sync:
1. **User registers on iPhone**: The passkey is saved to iCloud Keychain.
2. **User opens iPad**: The same Passkey is available immediately. 
3. **User logs in on Mac**: No new registration is needed; the Mac "sees" the same passkey.

### Cross-Platform Fallback:
If a user is on a device *without* sync (e.g., from Windows to Android), they can use the **Scan QR** method:
- During login, the browser will ask "Use a different device".
- User scans the QR code on their phone.
- The phone authenticates, and the desktop session is established.

## 4. Best Practices for Developers

- **Always use `isConnecting`**: Prevent UI flickers by showing a loading state while the SDK restores the session.
- **Listen for Wallet Changes**: The `wallet` object is reactive. If a user disconnects, your UI will update instantly.
- **Security First**: Remind users that while passkeys are persistent, they should still use "Disconnect" on shared public computers.

---

[Back to Documentation](../README.md#tutorials)
