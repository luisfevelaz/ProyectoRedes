import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ConciertoComponent } from '../concierto/concierto.component'
import { MatDialog } from '@angular/material/dialog';
import { ERROR, sweetOpen } from '../shared/sweet-alert';

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

  constructor(private aRoute: ActivatedRoute,
    private spotify: SpotifyService,
    private artistaService: ArtistaServiceService,
    private dialog: MatDialog
  ) {
    this.loading = true;
    this.aRoute.params.subscribe(params =>{
      console.log(params);
      if(isNaN(params['id'])){
        this.getSpotifyArtist(params['id']);
        this.getTopTracks(params['id']);
      }
      else{
        this.getArtist(params['id'])
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

  openConcierto(){
    try{
      //Abrimos el modal para edición
      this.dialog.open(ConciertoComponent, {
        data: {
          id: this.artista.id,
          blnNuevo: true
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

}
