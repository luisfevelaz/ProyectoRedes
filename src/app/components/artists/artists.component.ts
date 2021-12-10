import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private aRoute:ActivatedRoute, private spotify:SpotifyService) {
    this.loading = true;
    this.aRoute.params.subscribe(params =>{
      console.log(params);
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
      // this.spotify.routeArtist(params['id']).subscribe(data =>{
      //   this.artista=data;
      //   this.loading=false;
      //   console.log(this.artista);
        
      // });
      
    });
  }

  getTopTracks(id){
    this.spotify.getTopTracks(id).subscribe(data => this.tracks=data);
  }

  getArtist(id) {
    this.spotify.routeArtist(id).subscribe(data =>{
      this.artista=data;
      this.loading=false;
      //console.log(this.artista.name);
      
    });
  }

  ngOnInit(): void {
  }

}
