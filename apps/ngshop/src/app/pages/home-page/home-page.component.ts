import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngshop-home-page',
    template: `
        <p-accordion>
            <p-accordionTab header="Header 1"> Content 1 </p-accordionTab>
            <p-accordionTab header="Header 2"> Content 2 </p-accordionTab>
            <p-accordionTab header="Header 3"> Content 3 </p-accordionTab>
        </p-accordion>
    `
})
export class HomePageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
