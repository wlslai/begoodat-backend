import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class CreateSkillInput {
  @MinLength(1)
  @Field()
  name: string;

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

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  courses: string[];
}
