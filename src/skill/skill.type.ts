import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/course.type';

@ObjectType('Skill')
export class SkillType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  completionDate?: string;

  @Field(() => [CourseType])
  courses: string[];
}
