import { ProductImage } from "./product-image.model";

export class Product {
    id: string = '';
    name: string = '';
    description: string = '';
    stock: number = 0;
    price: number = 0;
    createdDate: Date | null = null;
    updatedDate: Date | null = null;
    imageFiles: ProductImage[] = [];
    imagePath: string = '';
}
