import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateSkillInput } from './create-skill.input';
import { UpdateSkillInput } from './update-skill.input';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async getSkills(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async getSkill(id: string): Promise<Skill> {
    const foundSkill = await this.skillRepository.findOne({ where: { id } });
    if (!foundSkill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }
    return foundSkill;
  }

  async createSkill(createSkillInput: CreateSkillInput): Promise<Skill> {
    const { name, description, startDate, completionDate, courses } =
      createSkillInput;
    const skill = this.skillRepository.create({
      id: uuid(),
      name,
      description,
      startDate,
      completionDate,
      courses,
    });
    return this.skillRepository.save(skill);
  }

  async updateSkill(
    id: string,
    updateSkillInput: UpdateSkillInput,
  ): Promise<Skill> {
    if (Object.keys(updateSkillInput).length === 0) {
      throw new BadRequestException('At least one field need to be updated');
    }

    const skill = await this.getSkill(id);

    Object.assign(skill, updateSkillInput);
    return this.skillRepository.save(skill);
  }

  async addCourseToSkill(skillId: string, courseIds: string[]): Promise<Skill> {
    const skill = await this.getSkill(skillId);

    for (const courseId of courseIds) {
      if (!skill.courses.includes(courseId)) {
        skill.courses.push(courseId);
      }
    }
    return this.skillRepository.save(skill);
  }

  async removeCourseFromSkill(
    skillId: string,
    courseId: string,
  ): Promise<Skill> {
    const skill = await this.getSkill(skillId);

    skill.courses = skill.courses.filter((id) => id !== courseId);
    return this.skillRepository.save(skill);
  }
}
