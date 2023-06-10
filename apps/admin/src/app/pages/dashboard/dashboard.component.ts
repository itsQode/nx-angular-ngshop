import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@itscode/orders';
import { ProductsService } from '@itscode/products';
import { UsersService } from '@itscode/users';
import { Subject, catchError, combineLatest, of, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    statistics: any[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount().pipe(catchError(() => of('error'))),
            this.productService.getProductsCount().pipe(catchError(() => of('error'))),
            this.userService.getUsersCount().pipe(catchError(() => of('error'))),
            this.ordersService.getTotalSales().pipe(catchError(() => of('error')))
        ])
            .pipe(takeUntil(this.endsubs$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }

    ngOnDestroy() {
        this.endsubs$.next(0);
        this.endsubs$.complete();
    }
}
