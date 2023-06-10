import { IProduct } from './product';

export interface IOrderItem {
    quantity?: number;
    product?: IProduct | any;
}
