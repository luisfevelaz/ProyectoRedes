import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // Configuración de Google Maps 
  center: google.maps.LatLngLiteral // para ubicar nuestro mapa en la posición deseada
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 3,
  }
  //OPCIONES PARA LOS MARCADORES
  position = {
    lat: 21.880843,
    lng: -102.296096
  }
  label = {
    color: 'red'
  }

  @Input() items:any []=[];
  
  constructor(private router:Router) { }

  verArtista(item){
   console.log(item);
   let artistaID;
   

   artistaID = item.id;
  
   this.router.navigate(['/artists',artistaID]);
   
  }

  ngOnInit(): void {
    this.center = {
      lat: 21.880843,
      lng:  -102.296096
    }
  }

  getCenter(lati: Number,longi: Number){
    let center = {
      lat: lati,
      lng:  longi
    }
    return center
  }

  getPosition(lat,lng){
    let position = {
      lat: lat,
      lng: lng
    }
    return position
  }

}
