import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { StudentsModule } from './modules/students/students.module';
import { StudentsModuleGQL } from './modules/students_gql/students.module';
import { StudentsModuleGQLExt } from './modules/students_gql_ext/students.module';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';

const pathConfig = path.resolve(__dirname, './tools/config', '**', '!(*.d).{ts,js}');
const pathEntities = path.resolve(__dirname, './entities', '**', '*.entity{.ts,.js}');

@Module({
  imports: [
    ConfigModule.load(pathConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
          ...config.get('database'),
          entities: [pathEntities],
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
    StudentsModuleGQL,
    StudentsModuleGQLExt,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})

export class AppModule {}
