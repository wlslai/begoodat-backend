import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class RemoveCourseFromSkillInput {
  @IsUUID()
  @Field(() => ID)
  skillId: string;

  @IsUUID()
  @Field(() => ID)
  courseId: string;
}
