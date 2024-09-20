export class Review {
    id: number;
    userId: number;
    ratings: { [feature: string]: number };
    overallRating: number;
    comment: string;
    productId: number;
    createdAt: Date;
    reviewImages: string[]; // aws s3 storage bucket links
    isUserCertified: boolean;
}
