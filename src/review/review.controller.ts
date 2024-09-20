import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ReviewService, sortBy, sortOrder } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Get('product/:productId')
  findByProductId(@Param('productId') productId: string, @Query('sortBy') sortBy: sortBy = "ratings", @Query('sortOrder') sortOrder: sortOrder = "asc", @Query("certified") certified: string = "true") {
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException('Invalid sortOrder');
    }
    return this.reviewService.getByProductId(+productId, sortBy, sortOrder, certified === "true");
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.reviewService.getByUserId(+userId);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
