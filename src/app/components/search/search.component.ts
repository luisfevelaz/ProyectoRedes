import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  resultados: any=[];
  encontrado: any;
  loading: boolean;

  constructor(private spotify:SpotifyService, private _artista:ArtistaServiceService) {
   
  }

  buscar(term){
    if(term ===''){
      this.resultados=[];
      return;
    }
    

    this.loading=true;

     this.getUsuario(term)
  
    this.spotify.getArtists(term).subscribe((data: any) =>{
      //console.log(data.artists.items);
     
      this.resultados= data;
      this.loading = false;
    });


  }

   getUsuario(term): void {
    var body = {
      usuario: term
    };

    this._artista.getByUser(body).then((data: any) =>{
      console.log(data)

      this.encontrado = {
        name: data.name.usuario,
        genres: ['indie', 'Desconocido']
      }

      this.resultados[0] = this.encontrado;
      console.log(this.resultados)
      this.loading = false;
      
    })
  }

  ngOnInit(): void {
  }

}
