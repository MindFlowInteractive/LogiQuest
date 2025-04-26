import { RpcProvider } from 'starknet';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get API key from environment variables
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const NETWORK = process.env.NODE_ENV === 'production' ? 'mainnet' : 'goerli';

// Create a provider only when needed, not during module initialization
const createProvider = () => {
  if (!ALCHEMY_API_KEY) {
    console.warn('No Alchemy API key provided. Starknet features will not work.');
    return null;
  }
  
  try {
    return new RpcProvider({
      nodeUrl: `https://starknet-${NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
    });
  } catch (error) {
    console.warn('Failed to create Starknet provider:', error.message);
    return null;
  }
};

// Create a mock provider and account that don't make network calls
export const provider = {
  getTransactionReceipt: async (transactionHash: string) => ({
    execution_status: 'SUCCEEDED',
    finality_status: 'ACCEPTED_ON_L2',
    transaction_hash: transactionHash
  }),
  getChainId: async () => '1',
  // Add other methods as needed
};

export const starkAccount = {
  address: '0x0',
  execute: async () => ({ transaction_hash: '0x0' })
};

// Export a function to get the real provider when needed
export const getRealProvider = createProvider;

export default {
  provider,
  starkAccount,
  getRealProvider
};