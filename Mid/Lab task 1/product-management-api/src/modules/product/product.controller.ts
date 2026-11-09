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
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly prodService: ProductService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.prodService.create(body);
  }

  @Get()
  findAll() {
    return this.prodService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) productId: string) {
    return this.prodService.findOne(productId);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.prodService.update(productId, body);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) productId: string) {
    return this.prodService.remove(productId);
  }
}