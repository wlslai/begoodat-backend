import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Course')
export class CourseType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  completionDate?: string;
}
