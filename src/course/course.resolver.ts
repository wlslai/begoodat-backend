import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseType } from './course.type';
import { CourseService } from './course.service';
import { CreateCourseInput } from './create-course.input';
import { UpdateCourseInput } from './update-course.input';

@Resolver(() => CourseType)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Query(() => [CourseType])
  courses() {
    return this.courseService.getCourses();
  }

  @Query(() => CourseType)
  course(@Args('id') id: string) {
    return this.courseService.getCourse(id);
  }

  @Mutation(() => CourseType)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.createCourse(createCourseInput);
  }

  @Mutation(() => CourseType)
  updateCourse(
    @Args('id') id: string,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return this.courseService.updateCourse(id, updateCourseInput);
  }
}
