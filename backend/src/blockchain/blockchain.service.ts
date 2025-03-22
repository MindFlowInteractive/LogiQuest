import { Injectable, Logger } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../transactions/entities/transactions.entity';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private provider: ethers.Provider;
  private wallet: ethers.Wallet;

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly configService: ConfigService,
  ) {
    // Initialize provider and wallet
    this.initializeBlockchain();
  }

  private initializeBlockchain() {
    const rpcUrl = this.configService.get<string>('BLOCKCHAIN_RPC_URL');
    const privateKey = this.configService.get<string>('BLOCKCHAIN_PRIVATE_KEY');

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    this.logger.log('Blockchain service initialized');
  }

  async sendNFTReward(
    userId: string,
    tokenId: string,
    contractAddress: string,
    metadata: any,
  ): Promise<Transaction> {
    // Create a pending transaction record
    const transaction = await this.transactionsService.create({
      type: TransactionType.NFT,
      status: TransactionStatus.PENDING,
      userId,
      tokenId,
      contractAddress,
      metadata,
    });

    try {
      // Load NFT contract
      const nftContract = new ethers.Contract(
        contractAddress,
        [
          'function safeTransferFrom(address from, address to, uint256 tokenId)',
        ],
        this.wallet,
      );

      // Get user's wallet address from metadata or other source
      const userWalletAddress = metadata.walletAddress;

      // Send the NFT
      const tx = await nftContract.safeTransferFrom(
        this.wallet.address,
        userWalletAddress,
        tokenId,
      );

      // Update transaction with pending tx hash
      await this.transactionsService.update(transaction.id, {
        txHash: tx.hash,
        status: TransactionStatus.PROCESSING,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      // Update transaction with confirmed details
      return this.transactionsService.update(transaction.id, {
        status: TransactionStatus.COMPLETED,
        blockNumber: receipt.blockNumber,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send NFT reward: ${error.message}`,
        error.stack,
      );

      // Update transaction as failed
      await this.transactionsService.update(transaction.id, {
        status: TransactionStatus.FAILED,
        metadata: {
          ...transaction.metadata,
          error: error.message,
        },
      });

      throw error;
    }
  }

  async sendTokenReward(
    userId: string,
    amount: string,
    contractAddress: string,
    metadata: any,
  ): Promise<Transaction> {
    // Create a pending transaction record
    const transaction = await this.transactionsService.create({
      type: TransactionType.TOKEN,
      status: TransactionStatus.PENDING,
      userId,
      amount,
      contractAddress,
      metadata,
    });

    try {
      // Load token contract
      const tokenContract = new ethers.Contract(
        contractAddress,
        ['function transfer(address to, uint256 amount) returns (bool)'],
        this.wallet,
      );

      // Get user's wallet address from metadata or other source
      const userWalletAddress = metadata.walletAddress;

      // Send the tokens
      const tx = await tokenContract.transfer(
        userWalletAddress,
        ethers.parseUnits(amount, 18), // Assuming 18 decimals for STRK token
      );

      // Update transaction with pending tx hash
      await this.transactionsService.update(transaction.id, {
        txHash: tx.hash,
        status: TransactionStatus.PROCESSING,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      // Update transaction with confirmed details
      return this.transactionsService.update(transaction.id, {
        status: TransactionStatus.COMPLETED,
        blockNumber: receipt.blockNumber,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send token reward: ${error.message}`,
        error.stack,
      );

      // Update transaction as failed
      await this.transactionsService.update(transaction.id, {
        status: TransactionStatus.FAILED,
        metadata: {
          ...transaction.metadata,
          error: error.message,
        },
      });

      throw error;
    }
  }

  async trackAchievement(
    userId: string,
    achievementId: string,
    metadata: any,
  ): Promise<Transaction> {
    // Create a transaction record for achievement
    return this.transactionsService.create({
      type: TransactionType.ACHIEVEMENT,
      status: TransactionStatus.COMPLETED, // No blockchain interaction needed
      userId,
      metadata: {
        achievementId,
        ...metadata,
      },
    });
  }

  async getTransactionStatus(txHash: string): Promise<TransactionStatus> {
    try {
      const tx = await this.provider.getTransaction(txHash);

      if (!tx) {
        return TransactionStatus.PENDING;
      }

      if (!tx.blockNumber) {
        return TransactionStatus.PROCESSING;
      }

      const receipt = await this.provider.getTransactionReceipt(txHash);

      if (receipt && receipt.status === 1) {
        return TransactionStatus.COMPLETED;
      } else {
        return TransactionStatus.FAILED;
      }
    } catch (error) {
      this.logger.error(
        `Failed to get transaction status: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async syncTransactionStatuses(): Promise<void> {
    try {
      // Get all pending or processing transactions
      const pendingTransactions = await this.transactionsService.findAll({
        status: TransactionStatus.PROCESSING,
      });

      for (const transaction of pendingTransactions) {
        if (!transaction.txHash) continue;

        const currentStatus = await this.getTransactionStatus(
          transaction.txHash,
        );

        if (currentStatus !== transaction.status) {
          await this.transactionsService.updateTransactionStatus(
            transaction.id,
            currentStatus,
          );

          this.logger.log(
            `Updated transaction ${transaction.id} status from ${transaction.status} to ${currentStatus}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `Failed to sync transaction statuses: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
