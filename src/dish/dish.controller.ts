import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DishEntity } from './dto/entity/dish.entity';

@ApiTags('dish')
@Controller('api/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getDishes(): Promise<DishEntity[]> {
    return await this.dishService.getDishes();
  }

  @Get(':dish_id')
  @ApiParam({ name: 'dish_id', required: true, type: String })
  async getDishByID(@Param() params: { dish_id: string }): Promise<DishEntity> {
    return (await this.dishService.getDishByID(params.dish_id))[0];
  }
}
