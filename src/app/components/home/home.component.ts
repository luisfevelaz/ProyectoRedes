import { Component, OnInit } from '@angular/core';
// para hacer peticiones HTTP
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {
  releases: any = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  
  constructor(private _usersService: UsersService) {
    this.error = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this._usersService.isUserInSession();
  }

}
