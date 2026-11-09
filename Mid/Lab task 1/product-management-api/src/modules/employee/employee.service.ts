import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(payload: CreateEmployeeDto) {
    const newEmployee = this.employeeRepo.create(payload);

    return await this.employeeRepo.save(newEmployee);
  }

  async findAll() {
    return await this.employeeRepo.find();
  }

  async findOne(empId: string) {
    const found = await this.employeeRepo.findOne({ where: { id: empId } });
    if (!found) {
      throw new NotFoundException(`Employee with ID ${empId} not found`);
    }

    return found;
  }

  async update(empId: string, payload: UpdateEmployeeDto) {
    const emp = await this.findOne(empId);
    Object.assign(emp, payload);
    return await this.employeeRepo.save(emp);
  }

  async remove(empId: string) {
    const emp = await this.findOne(empId);
    await this.employeeRepo.remove(emp);
    return { message: `Employee with ID ${empId} deleted successfully` };
  }
}

