import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(input: CreateUserDto) {
    const emailTaken = await this.userRepo.findOne({
      where: { email: input.email },
    });
    if (emailTaken) {
      throw new ConflictException("Email is already registered");
    }

    const hashed = await argon2.hash(input.password, {
      type: argon2.argon2id,
    });

    const newUser = this.userRepo.create({
      name: input.name,
      email: input.email,
      role: input.role,
      passwordHash: hashed,
    });
    const savedUser = await this.userRepo.save(newUser);

    // hide the password hash from response
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      status: savedUser.status,
      createdAt: savedUser.createdAt,
    };
  }

  async findAll() {
    return await this.userRepo.find();
  }
}