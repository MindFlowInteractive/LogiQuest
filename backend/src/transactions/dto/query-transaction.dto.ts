import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  TransactionType,
  TransactionStatus,
} from '../entities/transactions.entity';

export class QueryTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  txHash?: string;

  @IsString()
  @IsOptional()
  contractAddress?: string;
}
