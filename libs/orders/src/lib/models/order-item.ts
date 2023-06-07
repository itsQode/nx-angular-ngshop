import { IProduct } from '@itscode/products';

export interface IOrderItem {
    quantity?: number;
    product?: IProduct | string;
}
