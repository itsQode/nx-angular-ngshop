import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngshop-footer',
    template: `<footer>
        <div class="grid footer-wrapper">
            <div class="col-8">&copy; 1994 - 2023 E-Shop</div>
            <div class="col-4 social">
                <a class="nav-link" target="_blank" href="https://github.com/itsQode/nx-angular-ngshop"
                    ><i class="pi pi-github" style="font-size: 1.5rem"></i
                ></a>
            </div>
        </div>
    </footer> `
})
export class FooterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
