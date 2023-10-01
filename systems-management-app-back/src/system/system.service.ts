import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSystemDto, UpdateSystemDto, QuerySystemsDto } from './dto';

@Injectable()
export class SystemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSystemDto) {
    // Create system
    const system = await this.prisma.system.create({
      data: {
        ...dto,
      },
    });

    // Return system
    return system;
  }

  async findAll() {
    // Find all systems
    const systems = await this.prisma.system.findMany();

    // Check if systems were found
    if (!systems) {
      throw new NotFoundException('Systems not found');
    }

    // Return systems
    return systems;
  }

  async findByQuery(dto: QuerySystemsDto) {
    const { description, acronym, email } = dto;

    // All systems, without filters:
    let systems = await this.findAll();

    if (description) {
      systems = systems.filter((system) =>
        system.description.includes(description),
      );
    }

    if (acronym) {
      systems = systems.filter((system) => system.acronym.includes(acronym));
    }

    if (email) {
      systems = systems.filter((system) => system.email.includes(email));
    }

    // Check if systems were found
    if (!systems) {
      throw new NotFoundException('Systems not found');
    }

    // Return systems
    return systems;
  }

  async findOne(id: string) {
    // Find system
    const system = await this.prisma.system.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Check if system was found
    if (!system) {
      throw new NotFoundException(`System with id ${id} not found`);
    }

    // Return system
    return system;
  }

  async update(id: string, dto: UpdateSystemDto) {
    // If there is no data in dto
    if (!dto) {
      throw new BadRequestException('No data in dto');
    }

    // Update system
    const system = await this.prisma.system.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dto,
      },
    });

    // Check if system was updated
    if (!system) {
      throw new InternalServerErrorException('Internal Server Error');
    }

    // Return system
    return system;
  }

  async remove(id: string) {
    // Delete system
    const system = await this.prisma.system.delete({
      where: {
        id: Number(id),
      },
    });

    // Check if system was deleted
    if (!system) {
      throw new NotFoundException(`System with id ${id} not found`);
    }

    // Return system
    return system;
  }
}
