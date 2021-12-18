import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  inSession: boolean = false;

  constructor(
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._usersService.inSession.subscribe(data => {
      if(data)
        this.inSession = true;
      else
        this.inSession = false;
    });
  }

  logOut(){
    this._usersService.removeToken();
    this._usersService.isUserInSession();
  }
}
