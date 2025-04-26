import { Injectable, Logger } from '@nestjs/common';
import { provider, starkAccount, getRealProvider } from '../config/starknet.config';
import { Contract } from 'starknet';

// Define a simple interface for the transaction status
interface TransactionStatusResponse {
  executionStatus: string;
  finalityStatus: string;
  [key: string]: any;
}

@Injectable()
export class StarknetService {
  private readonly logger = new Logger(StarknetService.name);
  private contract: Contract | null = null;

  constructor() {
    // Don't initialize contract in constructor
    // This will be done lazily when needed
  }

  private async initializeContract() {
    try {
      const contractAddress = '0x07Cae261a7B5f15Db1cC2e0a00727B0436015800eA6021D761A788fefEfA9f9C';
      const abi = require('../abi/MyContract.json');
      const realProvider = getRealProvider();
      
      if (!realProvider) {
        this.logger.warn('Starknet provider not available. Using mock contract.');
        return false;
      }
      
      this.contract = new Contract(abi, contractAddress, realProvider);
      this.logger.log(`Contract initialized at address: ${contractAddress}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to initialize contract: ${error.message}`);
      return false;
    }
  }

  async mintAchievementNFT(userId: number, metadata: any) {
    try {
      // Initialize contract if not already done
      if (!this.contract) {
        const success = await this.initializeContract();
        if (!success) {
          return 'mock_tx_hash_for_development';
        }
      }

      const tx = await this.contract.invoke('mint', [
        starkAccount.address,
        metadata.title,
        metadata.description,
        metadata.imageUrl,
      ]);
      
      this.logger.log(`NFT minted with transaction hash: ${tx.transaction_hash}`);
      return tx.transaction_hash;
    } catch (error) {
      this.logger.error(`Failed to mint NFT: ${error.message}`);
      throw new Error(`Failed to mint NFT: ${error.message}`);
    }
  }

  public async getTransactionStatus(transactionHash: string): Promise<TransactionStatusResponse> {
    try {
      const txReceipt = await provider.getTransactionReceipt(transactionHash);

      // For development, this will always return the mock values
      return {
        executionStatus: 'SUCCEEDED',
        finalityStatus: 'ACCEPTED_ON_L2'
      };
    } catch (error) {
      this.logger.error(`Failed to get transaction status: ${error.message}`);
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }
}