import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AddCourseToSkillInput {
  @IsUUID()
  @Field(() => ID)
  skillId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  courseIds: string[];
}
