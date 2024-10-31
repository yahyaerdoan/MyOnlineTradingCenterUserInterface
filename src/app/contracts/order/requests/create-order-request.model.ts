export class CreateOrderRequest {
    createOrderDto: CreateOrderDto = new CreateOrderDto();
}

export class CreateOrderDto {
    userId?: string;
    orderNumber?: string;
    address: string = '';
    description: string = ''; 
    orderItemDtos?: OrderItemDto[];
}
export class OrderItemDto{
    id?:string;
    productId?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
}