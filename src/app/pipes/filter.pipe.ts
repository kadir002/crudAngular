import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const result=[];
   if(value!=''){
    for(const row of value){
      if(row.nombre.indexOf(args)>-1 || row.id.toString().indexOf(args)>-1){
        result.push(row);
      }
    }
   }
    return result;
  }

}
