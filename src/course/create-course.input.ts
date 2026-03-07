import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @MinLength(1)
  @Field()
  name: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  completionDate?: string;
}
