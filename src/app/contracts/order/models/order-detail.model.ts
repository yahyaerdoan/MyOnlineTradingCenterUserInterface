export class OrderDetail {
    orderDetailDto: OrderDetailDto = new OrderDetailDto();
}
export class OrderDetailDto {
    id: string = '';
    orderNumber: string = '';
    userName: string = '';
    address: string = '';
    description: string = '';
    orderItems: OrderItemDto[] = [];
    createdDate: Date = new Date();
    subtotal: number = 0;
    tax: number = 0;
    withTax: number = 0;
    totalAmount: number = 0;
    status: boolean = false;
}

export class OrderItemDto {
    orderId: string = '';
    productName: string = '';
    price: number = 0;
    quantity: number = 0;
    subtotal: number = 0;
}