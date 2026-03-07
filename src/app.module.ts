import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SkillModule } from './skill/skill.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill/skill.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      synchronize: true,
      entities: [Skill, Course],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true, // tells NestJS to save the schemas in memory and regenerate them every time we start the application
      driver: ApolloDriver, // tells NestJS to use the Apollo GraphQL server
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    SkillModule,
    CourseModule,
  ],
})
export class AppModule {}
