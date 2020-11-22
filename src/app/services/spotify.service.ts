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
      Authorization : 'Bearer BQBLTL1zxeFgnh7_7G0mbXJY-yj1jbkJ6OAvYd7rRs-PZZ7nxfmlAV2t5WOV3eQnQEg6LEOCz6AWtekwzW0'
    })

    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get(url, {headers});
  }

  getNewReleses(){
    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQAf1sgyN7UhH-VLRV87u1KG_ZY8nMNA7iNwH1FpnSSOThS-aIWS02t9tv6nEsMk7xSCf0fP-ZacnO0okzQ'
    // });
    return this.getQuery('browse/new-releases').pipe(map(data => {
      return data['albums'].items;
    }))
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases',{headers}).pipe(map(data => {
    //   return data['albums'].items;
    // }));
  }

  getTopTracks(id){
    return this.getQuery(`artists/${id}/top-tracks?market=MX`).pipe(map(data => {
      return data['tracks'];
    }));
  }

  getArtists(term){
    // const headers = new HttpHeaders({
    //   Authorization : 'Bearer BQAf1sgyN7UhH-VLRV87u1KG_ZY8nMNA7iNwH1FpnSSOThS-aIWS02t9tv6nEsMk7xSCf0fP-ZacnO0okzQ'
    // })
    return this.getQuery(`search?q=${term}&type=artist`).pipe(map(data => {
      return data['artists'].items;
    }))
    // return this.http.get(`https://api.spotify.com/v1/search?q=${term}&type=artist`,{headers}).pipe(map(data => {
    //   return data['artists'].items;
    // }));
  }

  routeArtist(id){
    return this.getQuery(`artists/${id}`).pipe(map(data => {
      return data;
    }))
  }
}
