import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepsService } from './steps.service';
import { correctAnswerDTO, CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('steps')
@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new step' })
  @ApiResponse({ status: 201, description: 'The step has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepsService.create(createStepDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all steps' })
  @ApiResponse({ status: 200, description: 'Return all steps.' })
  findAll() {
    return this.stepsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a step by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the step.' })
  @ApiResponse({ status: 404, description: 'Step not found.' })
  findOne(@Param('id') id: string) {
    return this.stepsService.findOne(+id);
  }

  @Post('get-answer')
  @ApiOperation({ summary: 'Validate a step answer by id' })
  @ApiResponse({ status: 200, description: 'Return the step.' })
  @ApiResponse({ status: 404, description: 'Step not found.' })
  correctAnswer(
    @Body() payload: correctAnswerDTO
  ) {
    return this.stepsService.correctAnswer(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a step' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The step has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Step not found.' })
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a step' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The step has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Step not found.' })
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id);
  }
}
