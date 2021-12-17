import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string) {
    const headers = new HttpHeaders({
      Authorization : 'Bearer BQAyhewsvnvvCjBKfrjEcKrMX4irbeWBHWSEde6d9k-ybANvbCE9NiAfMbuDLO-qH5yopDID-zqMD480BHo'
    })

    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get(url, {headers});
  }

  getNewReleses(){
    return this.getQuery('browse/new-releases').pipe(map(data => {
      return data['albums'].items;
    }));
  }

  getTopTracks(id){
    return this.getQuery(`artists/${id}/top-tracks?market=MX`).pipe(map(data => {
      return data['tracks'];
    }));
  }
  

  getArtists(term){
    return this.getQuery(`search?q=${term}&type=artist`).pipe(map(data => {
      return data['artists'].items;
    }));
  }

  routeArtist(id){
    return this.getQuery(`artists/${id}`).pipe(map(data => {
      return data;
    }));
  }
}
