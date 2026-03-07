import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateSkillInput {
  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  completionDate?: string;
}
