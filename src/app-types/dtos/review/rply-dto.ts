import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RplyDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
