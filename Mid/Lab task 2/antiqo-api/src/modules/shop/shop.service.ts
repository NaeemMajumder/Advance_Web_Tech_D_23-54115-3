import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shop } from "./entities/shop.entity";
import { User } from "../user/entities/user.entity";
import { CreateShopDto } from "./dto/shop.dto";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepo: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(input: CreateShopDto) {
    const sellerUser = await this.userRepo.findOne({
      where: { id: input.sellerId },
    });
    if (!sellerUser) {
      throw new NotFoundException("Seller not found");
    }

    if (sellerUser.role !== "seller") {
      throw new BadRequestException("This user is not a seller");
    }

    const newShop = this.shopRepo.create(input);
    return await this.shopRepo.save(newShop);
  }

  async findAll() {
    return await this.shopRepo.find();
  }
}