export const CHAINS: any = {
    base: {
        name: 'Base',
        emoji: '🔵',
        // gradientStart: '0c53fe', // later we should add custom default gradients for each chain
        // gradientEnd: 'ffffff',
        chainId: 8453,
        tokenViewURL: 'https://basescan.org/token/',
        get tokenInfoAPI() {
            return `https://api.chainbase.online/v1/token/metadata?chain_id=${this.chainId}&contract_address=`;
        },
        get holderCountAPI() {
            return `https://api.chainbase.online/v1/token/holders?page=1&limit=1&chain_id=${this.chainId}&contract_address=`;
        },
        get holderDataAPI() {
            return `https://api.chainbase.online/v1/token/top-holders?page=1&limit=10&chain_id=${this.chainId}&contract_address=`;
        },
    },
};
