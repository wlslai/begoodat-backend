import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SkillType } from './skill.type';
import { SkillService } from './skill.service';
import { CreateSkillInput } from './create-skill.input';
import { AddCourseToSkillInput } from './add-course-to-skill.input';
import { Skill } from './skill.entity';
import { CourseService } from '../course/course.service';
import { RemoveCourseFromSkillInput } from './remove-course-from-skill.input';
import { UpdateSkillInput } from './update-skill.input';

@Resolver(() => SkillType)
export class SkillResolver {
  constructor(
    private skillService: SkillService,
    private courseService: CourseService,
  ) {}

  @Query(() => [SkillType])
  skills() {
    return this.skillService.getSkills();
  }

  @Query(() => SkillType)
  skill(@Args('id') id: string) {
    return this.skillService.getSkill(id);
  }

  @Mutation(() => SkillType)
  createSkill(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillService.createSkill(createSkillInput);
  }

  @Mutation(() => SkillType)
  updateSkill(
    @Args('id') id: string,
    @Args('updateSkillInput') updateSkillInput: UpdateSkillInput,
  ) {
    return this.skillService.updateSkill(id, updateSkillInput);
  }

  @Mutation(() => SkillType)
  addCourseToSkill(
    @Args('addCourseToSkillInput') addCourseToSkillInput: AddCourseToSkillInput,
  ) {
    const { skillId, courseIds } = addCourseToSkillInput;
    return this.skillService.addCourseToSkill(skillId, courseIds);
  }

  @Mutation(() => SkillType)
  removeCourseFromSkill(
    @Args('removeCourseFromSkillInput')
    removeCourseFromSkillInput: RemoveCourseFromSkillInput,
  ) {
    const { skillId, courseId } = removeCourseFromSkillInput;
    return this.skillService.removeCourseFromSkill(skillId, courseId);
  }

  @ResolveField()
  async courses(@Parent() skill: Skill) {
    return this.courseService.getManyCourses(skill.courses);
  }
}
