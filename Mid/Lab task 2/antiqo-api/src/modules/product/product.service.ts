import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Shop } from "../shop/entities/shop.entity";
import { CreateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Shop)
    private readonly shopRepo: Repository<Shop>,
  ) {}

  async create(input: CreateProductDto) {
    const foundShop = await this.shopRepo.findOne({
      where: { id: input.shopId },
    });
    if (!foundShop) {
      throw new NotFoundException("Shop not found");
    }

    const newProduct = this.productRepo.create(input);

    return await this.productRepo.save(newProduct);
  }

  async findAll() {
    return await this.productRepo.find();
  }
}