import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from '../register/register.component';
import { ERROR, SUCCESS, sweetOpen } from '../shared/sweet-alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    "usuario": new FormControl('', [Validators.required]),
    "password": new FormControl('', [Validators.required])
  });
  
  constructor(
    private dialog: MatDialog,  //variable para abrir modales/diálogos
    private _artistaService: ArtistaServiceService,
    private _usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async login(){
    let account = this.formGroup.getRawValue();
    let registro = {} as any;
    try {
      let artistas = await this._artistaService.get();
      let existe = false;

      if(artistas){
        let artistArray: any[] = artistas["array"];
        
        for(let i = 0; i<artistas["array"].length; i++){
          registro = artistArray[i];
          if(registro.usuario==account["usuario"] && registro.password==account["password"]){
            existe = true;
            break;
          }
        }
      }

      if(existe){
        delete registro["password"];
        sweetOpen('Acceso', 'Inicio de sesión exitoso', SUCCESS);
        this._usersService.setToken(registro);
        this.router.navigate(['/home']);
      }
      else
        sweetOpen('Error', 'Las credenciales no son válidas', ERROR);
    }
    catch(e){
      sweetOpen('Error', 'No se pudo corroborar la información del usuario', ERROR);
    }
  }

  openRegister(){
    try{
      //Abrimos el modal para edición
      this.dialog.open(RegisterComponent, {
        backdropClass: 'backdropBackground'
      });
    }
    catch(e){
      console.log(e);
    }
  }

}
