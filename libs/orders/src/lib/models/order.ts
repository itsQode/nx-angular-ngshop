import { IUser } from '@itscode/users';
import { IOrderItem } from './order-item';

export interface IOrder {
    id?: string;
    orderItems?: IOrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    user?: any;
    dateOrdered?: string;
}
