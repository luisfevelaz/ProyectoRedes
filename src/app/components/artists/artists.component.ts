import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';

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
    private artistaService: ArtistaServiceService
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

  ngOnInit(): void {
  }

}
