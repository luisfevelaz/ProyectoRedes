import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: any[]): string {
    if(!value || value.length == 0){
      return 'assets/img/noImage.png';
    }
    return value[0].url;
  }

}
