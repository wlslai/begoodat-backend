import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { MongoRepository } from 'typeorm';
import { CreateCourseInput } from './create-course.input';
import { v4 as uuid } from 'uuid';
import { UpdateCourseInput } from './update-course.input';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: MongoRepository<Course>,
  ) {}

  getCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  createCourse(createCourseInput: CreateCourseInput): Promise<Course> {
    const { name, startDate, completionDate } = createCourseInput;
    const newCourse = this.courseRepository.create({
      id: uuid(),
      name,
      startDate,
      completionDate,
    });
    return this.courseRepository.save(newCourse);
  }

  async updateCourse(
    id: string,
    updateCourseInput: UpdateCourseInput,
  ): Promise<Course> {
    const { name, startDate, completionDate } = updateCourseInput;
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    } else if (Object.keys(updateCourseInput).length === 0) {
      throw new BadRequestException('At least one field need to be updated');
    }
    if (name) {
      course.name = name;
    }
    if (startDate || startDate === null) {
      // Allow setting startDate to null to indicate the course has not started yet
      course.startDate = startDate;
    }
    if (completionDate || completionDate === null) {
      // Allow setting completionDate to null to indicate the course is not completed yet
      course.completionDate = completionDate;
    }
    return this.courseRepository.save(course);
  }

  getManyCourses(courseIds: string[]): Promise<Course[]> {
    return this.courseRepository.find({
      where: {
        id: {
          $in: courseIds,
        },
      },
    });
  }
}
