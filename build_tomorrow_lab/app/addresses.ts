import data from '../data/receivingAddresses.json';

export type ReceivingAddress = {
  id: string;
  label: string;
  chain: string;
  address: string;
};

// Single source of truth for public receiving addresses (see data/receivingAddresses.json).
export const receivingAddresses = data as ReceivingAddress[];

// Short human note shown next to each network so people send on the right chain.
export const networkNotes: Record<string, string> = {
  BTC: 'Bitcoin network only.',
  ETH: 'Ethereum (ERC-20) network only.',
  BSC: 'BNB Smart Chain (BEP-20) network only.',
  MATIC: 'Polygon network only.',
  ARBITRUM: 'Arbitrum One network only.',
  BASE: 'Base network only.',
  SOL: 'Solana network only.',
  TRON: 'Tron (TRC-20) network only.',
};

export function getAddress(chain: string): ReceivingAddress | undefined {
  return receivingAddresses.find((entry) => entry.chain === chain);
}
