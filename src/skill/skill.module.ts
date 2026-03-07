import { Module } from '@nestjs/common';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), CourseModule],
  providers: [SkillResolver, SkillService],
})
export class SkillModule {}
