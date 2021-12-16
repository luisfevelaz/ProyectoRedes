import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private dialog: MatDialog  //variable para abrir modales/diálogos
  ) { }

  ngOnInit(): void {
  }

  openRegister(){
    try{
      //Abrimos el modal para edición
      this.dialog.open(RegisterComponent, {
        backdropClass: 'backdropBackground'
      })
        .afterClosed().subscribe(respuesta => {
          //Si se recibe OK mostramos un SweetAlert
          if(respuesta=='OK'){
            
          }
        }
      );
    }
    catch(e){
      console.log(e);
    }
  }

}
