import { Body, Controller, Get, Post } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/shop.dto";

@Controller("shops")
export class ShopController {
  constructor(private readonly shopsService: ShopService) {}

  @Post()
  create(@Body() body: CreateShopDto) {
    return this.shopsService.create(body);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }
}