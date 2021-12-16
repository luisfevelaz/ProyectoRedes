import { Injectable } from '@angular/core';
import { GlobalModel } from '../components/shared/global.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConciertoService {
  originUrl = GlobalModel.apiURL
  actions = GlobalModel.querysConcerts
  constructor(private _http: HttpClient) {
    console.log("Servicio de concierto comenzado")
   }

   get() { return this._http.get(`${this.originUrl}${this.actions.GetAll}`); }

   getByID(id: any) { return this._http.get(`${this.originUrl}${this.actions.GetID}${id}`); }

   post(body: any) { return this._http.post(`${this.originUrl}${this.actions.PostConcert}`, body).toPromise(); }

   delete(body: any) { return this._http.post(`${this.originUrl}${this.actions.DeleteConcert}`, body).toPromise();}

   update(body: any) { return this._http.put(`${this.originUrl}${this.actions.UpdateConcert}`, body).toPromise(); }


}
