import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): any {
    return request.cookies['name'];
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @Get('/hello')
  async sayHello(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
  ): Promise<string> {
    return await Promise.resolve(`Hello ${first_name} ${last_name}`);
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }
}
