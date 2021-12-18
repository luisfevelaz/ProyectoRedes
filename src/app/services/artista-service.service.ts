import { Injectable } from '@angular/core';
import { GlobalModel } from '../components/shared/global.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistaServiceService {
  originUrl = GlobalModel.apiURL
  actions = GlobalModel.querysArtists
  constructor(private _http: HttpClient) {
    console.log('El servicio de aristas esta cargado');
  }

   get() { return this._http.get(`${this.originUrl}${this.actions.GetAll}`); }

   getByID(id: any) { return this._http.get(`${this.originUrl}${this.actions.GetID}${id}`); }

   post(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostArtist}`, body).toPromise(); }

   delete(body: any) { return this._http.post(`${this.originUrl}${this.actions.DeleteArtist}`, body).toPromise();}

   update(body: any) { return this._http.put(`${this.originUrl}${this.actions.UpdateArtist}`, body).toPromise(); }

   getByUser(body: any) { return this._http.post(`${this.originUrl}${this.actions.GetUser}`, body).toPromise(); }
}
