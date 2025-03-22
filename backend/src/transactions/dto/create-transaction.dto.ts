import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  TransactionType,
  TransactionStatus,
} from '../entities/transactions.entity';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @IsString()
  @IsOptional()
  txHash?: string;

  @IsOptional()
  blockNumber?: number;

  @IsString()
  @IsOptional()
  amount?: string;

  @IsString()
  @IsOptional()
  tokenId?: string;

  @IsString()
  @IsOptional()
  contractAddress?: string;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
