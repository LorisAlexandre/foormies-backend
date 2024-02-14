import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateFormDto, UpdateFormDto } from './dtos';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}

  @Post('create')
  createForm(@Body() createFormDto: CreateFormDto, @Req() req) {
    return this.formService.createForm(
      {
        ...createFormDto,
      },
      req.user.sub,
    );
  }

  @Patch('update/:id')
  updateForm(
    @Body() updateFormDto: UpdateFormDto,
    @Param('id') formId: string,
    @Req() req,
  ) {
    return this.formService.updateForm(updateFormDto, formId, req.user.sub);
  }

  @Delete('delete/:id')
  deleteOne(@Param('id') formId: string, @Req() req) {
    return this.formService.deleteOne(formId, req.user.sub);
  }

  @Get('allByUser')
  getAllByUser(@Req() req) {
    return this.formService.getAllByUser(req.user.sub);
  }

  @Get('byId/:id')
  getById(@Param('id') formId: string, @Req() req) {
    return this.formService.getById(formId, req.user.sub);
  }
}
