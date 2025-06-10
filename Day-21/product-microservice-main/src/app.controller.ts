import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ role: 'product', cmd: 'create' })
  async createProduct(productDto) {
    const createData = await this.appService.createProduct(productDto);

    if (createData) {
      return {
        status: 200,
        message: 'Product created successfully'
      }
    } else {
      return {
        status: 500,
        message: 'Something went wrong'
      }
    }
  }

  @MessagePattern({ role: 'product', cmd: 'get-by-id' })
  async getProductById(id: number) {
    return await this.appService.getProductById(id);
  }

}
