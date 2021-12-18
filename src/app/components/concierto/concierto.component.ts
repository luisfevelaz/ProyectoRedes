import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConciertoService } from 'src/app/services/concierto.service';
import { ERROR, SUCCESS, sweetOpen } from '../shared/sweet-alert';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.css']
})
export class ConciertoComponent implements OnInit {
  formGroup = new FormGroup({
    "ciudad": new FormControl('', [Validators.required]),
    "latitud": new FormControl('', [Validators.required]),
    "longitud": new FormControl('', [Validators.required]),
  });
  idArtist: any;
  blnNuevo: Boolean = false;


  constructor(
    private dialogRef: MatDialogRef<ConciertoComponent>,  //referencia a sí mismo
    private _conciertoService: ConciertoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.idArtist = data.id;
    this.blnNuevo = data.blnNuevo;

    console.log("ID: ",this.idArtist);
    
  }

  ngOnInit(): void {
  }

  altaModal(){
    let body = {
      id_artista: this.idArtist,
      ciudad: this.formGroup.get("ciudad").value,
      latitud: this.formGroup.get("latitud").value,
      longitud: this.formGroup.get("longitud").value
    };
    this._conciertoService.post(body).then((resp: any) =>{
      // console.log("ALTA CONCIERTO RESP: ",resp);
      if(resp.success){
        sweetOpen('Acción', 'Concierto creado y guardado', SUCCESS);
      }else{
        sweetOpen('Error', 'Este usuario no tiene derechos de edición sobre este perfil', ERROR);
      }
    });
    this.close();
  }

  //Función de cierre del modal con envío de respuesta opcional
  close = (value?: any) => this.dialogRef.close(value);
}
