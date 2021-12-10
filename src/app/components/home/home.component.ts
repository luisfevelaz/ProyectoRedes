import { Component, OnInit } from '@angular/core';
// para hacer peticiones HTTP
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
// private http: HttpClient
// this.http.get('https://restcountries.eu/rest/v2/region/americas').subscribe((data) => {
//       console.log(data);
//       this.paises =
//     });
export class HomeComponent implements OnInit {
  releases: any = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  

  constructor(private spotify:SpotifyService) {
    this.loading = true;
    this.error=false;
    this.spotify.getNewReleses().subscribe( (data: any) =>{
      // this.releases = data.albums.items;
      this.releases = data;
      this.loading= false;
      
      //console.log(this.releases);
    }, (errorServicio) => {
      this.loading=false;
      this.error=true;
      this.mensajeError = errorServicio.error.error.message;
      
    });

    


  }

  ngOnInit(): void {
  }

}
