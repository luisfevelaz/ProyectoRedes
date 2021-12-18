import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ERROR, sweetOpen } from '../components/shared/sweet-alert';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyToken: string = "BQBfrKyp3GHGEnUFJQFVE-NckijmZaszik7V6asrElZvZu1CnKvCc9NAoifv0ZahkDaZG8L9_RePFDm8ynM";
  credentials = 'ec066d9f9e9248108c032b59ee3cde7c:6751025ffae44dd2aa2143eaeff1278e';

  constructor(private http: HttpClient) {
    //Ejectuamos inicialmente para obtener un primer token
    this.getSpotifyToken();
    //Cada hora obtenemos un token nuevo
    setInterval(this.getSpotifyToken.bind(this), 3600000);
  }

  getSpotifyToken(){
    //Credenciales a base64
    let credentials64 = btoa(this.credentials);
    //Headers necesarios para la solicitud
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization : `Basic ${credentials64}`
    });
    //Enviamos el cuerpo como un querystring ya que estamos usando application/x-www-form-urlencoded
    const body = 'grant_type=client_credentials';
    
    this.http.post('https://accounts.spotify.com/api/token', body, { headers })
      .subscribe(response => {
        if(response)
          this.spotifyToken = response["access_token"];  //obtenemos el token
      }, error => {
        //Mandamos una alerta al usuario si algo salió mal
        sweetOpen('Token', 'No se pudo obtener el token de Spotify', ERROR);
      });
  }

  getQuery(query:string) {
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.spotifyToken}`
    });
    console.log("Usando el token: "+this.spotifyToken);
    
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
