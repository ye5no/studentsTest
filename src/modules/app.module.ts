import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { StudentsModule } from './students/students.module';
import * as path from 'path';

const pathConfig = path.resolve(__dirname, '../tools/config', '**', '!(*.d).{ts,js}');
const pathEntities = path.resolve(__dirname, '../entities', '**', '*.entity{.ts,.js}');

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
  ],
})

export class AppModule {}
