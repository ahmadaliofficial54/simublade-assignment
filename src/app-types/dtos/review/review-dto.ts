import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { RplyDto } from './rply-dto';

export class ReviewDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  replies?: RplyDto[];
}
