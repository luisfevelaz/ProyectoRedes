import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup = new FormGroup({
    "email": new FormControl('', [Validators.required]),
    "password": new FormControl('', [Validators.required]),
    "confirmPass": new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>, //referencia a sí mismo
  ) { }

  ngOnInit(): void {
  }

  register(){
    let account = this.formGroup.getRawValue();
    console.log(account);
    delete account["confirmPass"];
    console.log(account);
  }

  //Función de cierre del modal con envío de respuesta opcional
  close = (value?: any) => this.dialogRef.close(value);
}
