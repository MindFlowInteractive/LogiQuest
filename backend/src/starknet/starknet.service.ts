import { Injectable, Logger } from '@nestjs/common';
import { provider, starkAccount } from '../config/starknet.config';
import { Contract } from 'starknet';
import * as abi from '../abi/MyContract.json';


@Injectable()
export class StarknetService {
  private readonly logger = new Logger(StarknetService.name);
  private contract: Contract;

  constructor() {
    this.initializeContract();
  }

  private async initializeContract() {
    const contractAddress = '0x07Cae261a7B5f15Db1cC2e0a00727B0436015800eA6021D761A788fefEfA9f9C'; // Add Starknet contract address
    const abi = require('../abi/MyContract.json'); // Import ABI file
    this.contract = new Contract(abi, contractAddress, provider);
    this.logger.log(`Contract initialized at address: ${contractAddress}`);
  }

  async mintAchievementNFT(userId: number, metadata: any) {
    try {
      const tx = await this.contract.invoke('mint', [
        starkAccount.address,
        metadata.title,
        metadata.description,
        metadata.imageUrl,
      ]);
      this.logger.log(
        `NFT minted with transaction hash: ${tx.transaction_hash}`,
      );
      return tx.transaction_hash;
    } catch (error) {
      this.logger.error(`Failed to mint NFT: ${error.message}`);
      throw new Error(`Failed to mint NFT: ${error.message}`);
    }
  }

  // async getTransactionStatus(transactionHash: string) {
  //   try {
  //     const txReceipt = await provider.getTransactionReceipt(transactionHash);
  //     this.logger.log(`Transaction status: ${txReceipt.status}`);
  //     return txReceipt.status;
  //   } catch (error) {
  //     this.logger.error(`Failed to get transaction status: ${error.message}`);
  //     throw new Error(`Failed to get transaction status: ${error.message}`);
  //   }
  // }

  public async getTransactionStatus(transactionHash: string) {
    try {
      const txReceipt = await provider.getTransactionReceipt(transactionHash);

      // Type guard to check if execution_status exists
      if ('execution_status' in txReceipt) {
        this.logger.log(
          `Transaction execution status: ${txReceipt.execution_status}, finality status: ${txReceipt.finality_status}`,
        );

        return {
          executionStatus: txReceipt.execution_status,
          finalityStatus: txReceipt.finality_status,
        };
      }

      this.logger.log('Transaction receipt:', txReceipt);
      throw new Error('Transaction status not available');
    } catch (error) {
      this.logger.error(`Failed to get transaction status: ${error.message}`);
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }
}
