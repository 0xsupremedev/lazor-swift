export const CONFIG = {
    // Solana RPC
    RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.ankr.com/solana_devnet',

    // LazorKit Config
    PORTAL_URL: "https://portal.lazor.sh",
    PAYMASTER: {
        paymasterUrl: "https://kora.devnet.lazorkit.com"
    },

    // Token Mints (Devnet)
    USDC_MINT: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
};
