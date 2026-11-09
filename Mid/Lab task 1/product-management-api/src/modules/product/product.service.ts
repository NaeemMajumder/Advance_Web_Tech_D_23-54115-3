import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    return await this.productRepo.save(newProduct);
  }

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(productId: string) {
    const found = await this.productRepo.findOne({ where: { id: productId } });
    if (!found) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return found;
  }

  async update(productId: string, data: UpdateProductDto) {
    const item = await this.findOne(productId);
    Object.assign(item, data);
    return await this.productRepo.save(item);
  }

  async remove(productId: string) {
    const item = await this.findOne(productId);
    await this.productRepo.remove(item);
    return { message: `Product with ID ${productId} deleted successfully` };
  }
}