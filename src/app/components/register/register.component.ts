import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistaServiceService } from 'src/app/services/artista-service.service';
import { ERROR, SUCCESS, sweetOpen } from '../shared/sweet-alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup = new FormGroup({
    "nombre": new FormControl('', [Validators.required]),
    "usuario": new FormControl('', [Validators.required]),
    "password": new FormControl('', [Validators.required]),
    "confirmPass": new FormControl('', [Validators.required]),
  });
  validPasswordMatch = false;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,  //referencia a sí mismo
    private _artistaService: ArtistaServiceService
  ) { }

  ngOnInit(): void {}

  passwordMatch(){
    let password = this.formGroup.get('password')?.value;
    let confirmPass = this.formGroup.get('confirmPass').value;
    //Obtenemos los errores para no alterar los que no sean wrongPassword
    let errors = this.formGroup.get('confirmPass').errors;
    
    if(password != confirmPass){  //si las contraseñas no coinciden
      //Checamos nulidad en errors para transformarlo en un objeto vacío
      errors = (errors==null)? {} : errors;
      errors['wrongPassword'] = true;  //creamos el error wrongPassword
    }
    else{
      if(errors != null)  //eliminamos wrongPassword sólo si errors no es nulo
        delete errors['wrongPassword'];
    }
    //Establecemos los errores que hayan quedado aún
    this.formGroup.get('confirmPass').setErrors(errors);
  }

  async register(){
    //Obtenemos las credenciales del usuario
    let account = this.formGroup.getRawValue();
    delete account["confirmPass"];  //borramos la confirmación

    try {
      let artistas = await this._artistaService.get();
      console.log(artistas);
      
      let existe = false;

      if(artistas){
        let artistArray: any[] = artistas["array"];
        
        for(let i = 0; i<artistas["array"].length; i++){
          if(artistArray[i].usuario==account["usuario"]){
            existe = true;
            break;
          }
        }
      }

      if(!existe){
        await this._artistaService.post(account);
        sweetOpen('Acción', 'El usuario se ha creado exitosamente', SUCCESS);
      }
      else
        sweetOpen('Acción', 'Ya existe una cuenta con ese nombre de usuario', ERROR);
    }
    catch(e){
      sweetOpen('Acción', 'No se pudo crear el usuario', ERROR);
    }
    this.close('OK');
  }

  //Función de cierre del modal con envío de respuesta opcional
  close = (value?: any) => this.dialogRef.close(value);
}
