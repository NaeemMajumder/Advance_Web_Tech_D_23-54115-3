import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";

@Controller("employees")
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Post()
  create(@Body() body: CreateEmployeeDto) {
    return this.empService.create(body);
  }

  @Get()
  findAll() {
    return this.empService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) empId: string) {
    return this.empService.findOne(empId);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) empId: string,
    @Body() body: UpdateEmployeeDto,
  ) {
    return this.empService.update(empId, body);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) empId: string) {
    return this.empService.remove(empId);
  }
}