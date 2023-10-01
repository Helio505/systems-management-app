import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Param,
} from "@nestjs/common";

import { SystemService } from "./system.service";
import { CreateSystemDto, UpdateSystemDto, QuerySystemsDto } from "./dto";

@Controller("systems")
export class SystemController {
  constructor(private systemService: SystemService) {}

  // @Get()
  // async findAll() {
  //   return this.systemService.findAll();
  // }

  @Get("/")
  async findSystems(@Query() dto: QuerySystemsDto) {
    if (Object.keys(dto).length === 0) {
      return this.systemService.findAll();
    }
    return this.systemService.findByQuery(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.systemService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSystemDto) {
    return this.systemService.create(dto);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateSystemDto) {
    return this.systemService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.systemService.remove(id);
  }
}
