import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  resultados: any=[];
  loading: boolean;
  constructor(private spotify:SpotifyService) {}

  buscar(term){
    if(term ===''){
      this.resultados=[];
      return;
    }
    this.loading=true;
    this.spotify.getArtists(term).subscribe((data: any) =>{
      //console.log(data.artists.items);
      console.log(data);
      this.resultados = data;
      this.loading=false;
    });

  }

  ngOnInit(): void {
  }

}
