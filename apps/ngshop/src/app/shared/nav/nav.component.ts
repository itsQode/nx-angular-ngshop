import { Component, OnInit } from '@angular/core';
import { AuthService, LocalstorageService, UsersService } from '@itscode/users';

@Component({
    selector: 'ngshop-nav',
    templateUrl: './nav.component.html',
    styles: []
})
export class NavComponent implements OnInit {
    isLogedIn = false;

    constructor(private authService: AuthService, private usersService: UsersService) {}

    ngOnInit(): void {
        this.usersService.observeCurrentUser().subscribe((user) => {
            this.isLogedIn = !!user;
        });
    }

    onLogOut() {
        this.authService.logout();
    }
}
