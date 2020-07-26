import {Pipe, PipeTransform} from '@angular/core';

/*
 * Pipe pour formatter les nombres afin de faciliter la lecture
 * */

@Pipe({name: 'intcomma'})

export class IntCommaPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    try {
      return (value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')).replace('.', ',');
    } catch (e) {
      return value;
    }
  }
}
