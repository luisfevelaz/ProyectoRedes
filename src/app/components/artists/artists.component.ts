import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ConciertoComponent } from '../concierto/concierto.component'
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private aRoute:ActivatedRoute, private spotify:SpotifyService,private dialog: MatDialog  ) {
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
