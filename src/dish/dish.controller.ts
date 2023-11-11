import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from './interfaces/dish.interface';

@Controller('api/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getDishes(): Promise<Dish[]> {
    return await this.dishService.getDishes();
  }

  @Get(':id')
  async getDishByID(@Param() params: { id: string }): Promise<Dish> {
    return (await this.dishService.getDishByID(params.id))[0];
  }
}
