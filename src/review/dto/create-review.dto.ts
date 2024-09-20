import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsObject()
    ratings: { [feature: string]: number };

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    overallRating: number;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsArray()
    reviewImages: string[];
}
