import { Component, OnInit } from '@angular/core';
// para hacer peticiones HTTP
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

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
  
  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    /* this.spotify.getNewReleses().subscribe((data: any) =>{
      // this.releases = data.albums.items;
      this.releases = data;
      this.loading= false;
    }, (errorServicio) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = errorServicio.error.error.message; 
    }); */
    this.loading = false; //temporalmente quitamos el loader
  }

  ngOnInit(): void {
  }

}
