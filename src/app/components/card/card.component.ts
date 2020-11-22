import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input() items:any []=[];
  
  constructor(private router:Router) { }

  verArtista(item){
   console.log(item);
   let artistaID;

   if(item.type === 'album') artistaID = item.artists[0].id;
   else artistaID = item.id;

   this.router.navigate(['/artists',artistaID]);
   
  }

  ngOnInit(): void {
  }

}
