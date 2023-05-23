import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-banner',
    template: ` <h2 class="color-red">Banner Works !</h2> `
})
export class BannerComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
