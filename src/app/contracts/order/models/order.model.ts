
export class Order {
    oderId!: string;
    orderNumber!: string;
    userName!: string;
    createdDate!: Date;
    status!: boolean;
    totalAmount!: number;
}
export class OrderListResult {
    totalOrderCount!: number;
    orders!: Order[];
}