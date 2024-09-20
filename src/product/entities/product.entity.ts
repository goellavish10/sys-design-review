import { Review } from "../../review/entities/review.entity";

export class Product {
    id: number;
    name: string;
    features: string[];
    reviews: Review[];
    sumOfRatings: number;
}