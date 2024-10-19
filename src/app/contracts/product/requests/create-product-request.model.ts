export class CreateProductRequest {
    createProductDto: {
        name: string;
        description: string;
        stock: number;
        price: number;
    } | undefined;
}
