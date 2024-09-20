import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

const products: Product[] = [
  {
    "id": 1,
    "name": "Product 1",
    "features": ["performance", "design", "build"],
    "reviews": [],
    "sumOfRatings": 0,
  },
  {
    "id": 2,
    "name": "Product 2",
    "features": ["color", "design", "build"],
    "reviews": [],
    "sumOfRatings": 0,
  },
  {
    "id": 3,
    "name": "Product 3",
    "features": ["performance", "battery", "screen"],
    "reviews": [],
    "sumOfRatings": 0,
  },
  {
    "id": 4,
    "name": "Product 4",
    "features": ["keyboard", "aux", "screen"],
    "reviews": [],
    "sumOfRatings": 0,
  },
  {
    "id": 5,
    "name": "Product 5",
    "features": ["trackpad", "battery", "speakers"],
    "reviews": [],
    "sumOfRatings": 0,
  }
]

@Injectable()
export class ProductService {

  private products: Product[] = products;

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return products;
  }

  updateSumOfRatings(productId: number, overallRating: number) {
    const product = this.products.find(product => product.id === productId);
    product.sumOfRatings += overallRating;
  }

  findOne(id: number) {
    return this.products.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
