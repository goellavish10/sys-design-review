import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';


export type sortBy = 'ratings' | 'createdAt';
export type sortOrder = 'asc' | 'desc';



@Injectable()
export class ReviewService {
  private reviews: Review[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {
  }


  create(createReviewDto: CreateReviewDto) {
    const product = this.productService.findOne(createReviewDto.productId);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const productFeatureRatings = createReviewDto.ratings;
    const productFeatures = product.features;

    const isValid = this.validateProductFeatures(productFeatureRatings, productFeatures);

    if (!isValid) {
      throw new BadRequestException('Invalid product feature review!');
    }

    const userExists = this.userService.findOne(createReviewDto.userId);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const order = this.orderService.findOrderByProductAndUserId(createReviewDto.productId, createReviewDto.userId);

    const review: Review = {
      ...createReviewDto,
      createdAt: new Date(),
      isUserCertified: !!order,
      id: this.reviews.length + 1,
    }

    this.productService.updateSumOfRatings(createReviewDto.productId, createReviewDto.overallRating);

    this.reviews.push(review);
  }

  getByUserId(userId: number) {
    const userExists = this.userService.findOne(userId);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    return this.reviews.filter(review => review.userId === userId);
  }

  getByProductId(productId: number, sortBy: sortBy, sortOrder: sortOrder, certified: boolean) {
    const product = this.productService.findOne(productId);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const allProductReviews = this.reviews.filter(review => review.productId === productId);

    const result = allProductReviews.filter(review => certified ? review.isUserCertified : true).sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'asc' ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return sortOrder === 'asc' ? a.overallRating - b.overallRating : b.overallRating - a.overallRating;
      }
    });

    const averageRating = product.sumOfRatings / allProductReviews.length;

    return {
      reviews: result,
      averageRating
    }
  }

  validateProductFeatures(productFeatureRatings: Record<string, number>, productFeatures: string[]) {
    const productFeatureRatingKeys = Object.keys(productFeatureRatings);

    const isValid = productFeatureRatingKeys.every((key) => productFeatures.includes(key));

    return isValid;
  }

  findAll() {
    return this.reviews;
  }

  findOne(id: number) {
    return this.reviews.find(review => review.id === id);
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
