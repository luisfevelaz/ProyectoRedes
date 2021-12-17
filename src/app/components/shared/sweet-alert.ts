import Swal from 'sweetalert2';

export const SUCCESS = 0;
export const ERROR = 1;

export function sweetOpen(title: string, text: string, type: number, width?: number){
    Swal.fire({
        title: title,
        text: text,
        width: width? width : 300,
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: (type==SUCCESS)? 'confirm-button' : 'confirm-button-error',
          container: (type==SUCCESS)? 'backdropBackground' : 'backdropBackground-error',
          popup: (type==SUCCESS)? 'sweet-popup-success' : 'sweet-popup-error'
        }
    });
}