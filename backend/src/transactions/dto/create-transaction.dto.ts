import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../entities/transactions.entity';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Type of transaction',
    example: 'DEPOSIT',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    description: 'Status of the transaction',
    example: 'PENDING',
    enum: TransactionStatus,
    required: false,
  })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    description: 'Transaction hash from blockchain',
    example: '0xabc123def456...',
    required: false,
  })
  @IsString()
  @IsOptional()
  txHash?: string;

  @ApiProperty({
    description: 'Block number where the transaction was recorded',
    example: 123456,
    required: false,
  })
  @IsOptional()
  blockNumber?: number;

  @ApiProperty({
    description: 'Amount of the transaction',
    example: '100.50',
    required: false,
  })
  @IsString()
  @IsOptional()
  amount?: string;

  @ApiProperty({
    description: 'Token ID associated with the transaction (if applicable)',
    example: 'token-12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  tokenId?: string;

  @ApiProperty({
    description: 'Smart contract address related to the transaction',
    example: '0x1234567890abcdef1234567890abcdef12345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  contractAddress?: string;

  @ApiProperty({
    description: 'Additional metadata associated with the transaction',
    example: { note: 'This is a test transaction' },
    required: false,
  })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'User ID linked to the transaction',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
