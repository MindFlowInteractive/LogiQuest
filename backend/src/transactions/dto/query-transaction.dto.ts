import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../entities/transactions.entity';
import { Type } from 'class-transformer';

export class QueryTransactionDto {
  @ApiProperty({
    description: 'Filter by transaction type',
    example: 'WITHDRAWAL',
    enum: TransactionType,
    required: false,
  })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @ApiProperty({
    description: 'Filter by transaction status',
    example: 'COMPLETED',
    enum: TransactionStatus,
    required: false,
  })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    description: 'Filter by user ID associated with the transaction',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId?: number;

  @ApiProperty({
    description: 'Filter by transaction hash',
    example: '0xabc123def456...',
    required: false,
  })
  @IsString()
  @IsOptional()
  txHash?: string;

  @ApiProperty({
    description: 'Filter by smart contract address',
    example: '0x1234567890abcdef1234567890abcdef12345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  contractAddress?: string;
}
