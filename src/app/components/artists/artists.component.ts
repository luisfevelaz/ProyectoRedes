import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ConciertoComponent } from '../concierto/concierto.component'
import { MatDialog } from '@angular/material/dialog';
import { ERROR, sweetOpen } from '../shared/sweet-alert';
import { ConciertoService } from 'src/app/services/concierto.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styles: [
  ]
})
export class ArtistsComponent implements OnInit {
  artista: any = {};
  tracks: any = [];
  loading: boolean;
  conciertos: any = [];
  //para mapas
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 3,
  }

  constructor(private aRoute: ActivatedRoute,
    private spotify: SpotifyService,
    private artistaService: ArtistaServiceService,
    private _conciertoService: ConciertoService,
    private dialog: MatDialog
  ) {
    this.loading = true;
    this.aRoute.params.subscribe(params =>{
      console.log(params);
      if(isNaN(params['id'])){
        this.getSpotifyArtist(params['id']);
        this.getTopTracks(params['id']);
        this.getConcerts(params['id']);
      }
      else{
        this.getArtist(params['id']);
        this.getConcerts(params['id']);
      }
    });
  }

  getTopTracks(id){
    this.spotify.getTopTracks(id).subscribe(data => this.tracks = data);
  }

  getSpotifyArtist(id) {
    this.spotify.routeArtist(id).subscribe(data =>{
      this.artista = data;
      this.loading = false;
    });
  }

  getConcerts(id){
    this._conciertoService.getByID(id).subscribe((data: any) =>{
      console.log('GET CONCIERTOS',data);
      this.conciertos = data.id;
      
    })
  }

  async getArtist(id){
    let response = await this.artistaService.getByID(id);
    response = response["id"];
    this.artista = {
      id: response["id"],
      name: response["usuario"]
    }
    this.loading = false;
  }

  noArtistPage(){
    sweetOpen('Enlace', 'Lo sentimos pero el artista no cuenta con una página oficial', ERROR);
  }
  openConcierto(accion,index){
    try{
      //Abrimos el modal para edición
      this.dialog.open(ConciertoComponent, {
        data: {
          id: this.artista.id,
          blnNuevo: accion,
          index: index
        },
        backdropClass: 'backdropBackground'
      });
    }
    catch(e){
      console.log(e);
    }
  }

  ngOnInit(): void {
  }

  getCenter(lati: Number,longi: Number){
    let center = {
      lat: lati,
      lng:  longi
    }
    return center
  }

  getPosition(lat,lng){
    let position = {
      lat: lat,
      lng: lng
    }
    return position
  }

}
