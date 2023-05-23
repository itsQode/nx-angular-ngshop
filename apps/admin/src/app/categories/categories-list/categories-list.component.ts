import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories = [
        {
            id: 1,
            name: 'health',
            icon: 'p p-user'
        }
    ];
    constructor() {}

    ngOnInit(): void {}
}
