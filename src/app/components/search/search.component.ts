import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { ConciertoService } from 'src/app/services/concierto.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  resultados: any = [];
  encontrado: any;
  loading: boolean;

  constructor(private spotify:SpotifyService, private _artista:ArtistaServiceService, private _concierto:ConciertoService) {
  }

  buscar(term){
    if(term === ''){
      this.resultados = [];
      return;
    }
    this.loading = true;

    this.spotify.getArtists(term).subscribe((data: any) =>{
      console.log(data);
      this.resultados = data;
      this.getUsuario(term,data);
      this.loading = false;
    });
  }

   getUsuario(term,dataSpoty): void {
    var body = {
      usuario: term
    };
    var coordenadas = {};

    this._artista.getByUser(body).then(async(data: any) =>{
      console.log(JSON.stringify(data));
      this.encontrado = {
        id: data.name.id,
        name: data.name.usuario,
        genres: ['indie', 'Desconocido']
      };
      
      coordenadas = await this.getCoordenadas(data);
      console.log("COORDENADAS NUEVAS: ",coordenadas);
      
      this.resultados = this.returnArrayResultados(this.encontrado,dataSpoty,coordenadas);
      console.log("Nuevos resultadossssss =>",this.resultados);
      this.loading = false;
    });
  }

  async getCoordenadas(artistaBD){
    var bodyID = {
      id: artistaBD.name.id
    }

    var coordenadas = {
      latitud: null,
      longitud: null
    }

    /* this._concierto.getCordenadas(bodyID).then((data: any) =>{
      console.log("DATOS CONCIERTO ", data);
      coordenadas.latitud = data.id.latitud;
      coordenadas.longitud = data.id.longitud;
    }) */

    let data = await this._concierto.getCordenadas(bodyID);
    if(data){
      coordenadas.latitud = data["id"].latitud;
      coordenadas.longitud = data["id"].longitud;
      console.log("DATOS CONCIERTO ", data);
    }

    return coordenadas;
  }

  returnArrayResultados(encontrado,dataSpoty: any[],coordenadas): any{
    // console.log('LLegan coordenadas', coordenadas.latitud, coordenadas.longitud);
    // console.log('LLegan coordenadas', coordenadas);
    console.log("Encontrado llega => ", encontrado);
    
    
    let resultados = [];
    /* dataSpoty.forEach(element => {
      if(element.name == encontrado.name){
        console.log('DEntro');
        
        resultados.push({
          external_urls: element.external_urls,
          genres: element.genres,
          images: element.images,
          name: element.name,
          latitud: coordenadas.latitud,
          longitud: coordenadas.longitud
        })
      }
    }); */

    if(dataSpoty.length > 0){  //si hay coincidencias de Spotify
      for(let i = 0; i<dataSpoty.length; i++){
        let element = dataSpoty[i];  
        resultados.push({
          id: element.id,
          external_urls: element.external_urls,
          genres: element.genres,
          images: element.images,
          name: element.name,
          latitud: ((Math.random() - 0.5) * 2) / 10,
          longitud: ((Math.random() - 0.5) * 2) / 10
        });
      }
      resultados.push({
          id: encontrado.id,
          external_urls: dataSpoty[0].external_urls,
          genres: encontrado.genres,
          images: dataSpoty[0].images,
          name: encontrado.name,
          latitud: coordenadas.latitud,
          longitud: coordenadas.longitud
      });
    }
    else {  //si no hay coincidencias de Spotify el encontrado no tendrá imagen y url
      resultados.push({
        id: encontrado.id,
        external_urls: '',
        genres: encontrado.genres,
        images: '',
        name: encontrado.name,
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud
    });
    }

    return resultados;
  }

  ngOnInit(): void {
  }

}
