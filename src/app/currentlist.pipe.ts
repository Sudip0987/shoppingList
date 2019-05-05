import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentlist'
})
export class CurrentlistPipe implements PipeTransform {

 
  transform(item:number): any {
    let now = new Date().getTime();
    let seconds = (now - item)/1000;
    let dateStr:string = '';
    if( seconds < 60 ){
      dateStr = 'just now';
    }
    else if( seconds >=60 && seconds <= 24*3600 ){
      let hours = Math.floor( seconds / 3600 );
      let hUnit = hours == 1 ? 'hour' : 'hours';
      let mins = Math.floor( (seconds - ( hours * 3600 )) / 60 );
      let mUnit = mins == 1 ? 'minute' : 'minutes';
      dateStr = (hours > 0) ? `${hours} ${hUnit} ${mins} ${mUnit} ago` : `${mins} ${mUnit} ago`;
    }
    else if( seconds >= 24 * 3600 ){
      let days = Math.floor( seconds / (3600 * 24) );
      let dUnit = days == 1 ? 'day' : 'days';
      let hours = Math.floor( (seconds - ( days * 24 * 3600 )) / 3600);
      let hUnit = hours == 1 ? 'hour' : 'hours';
      dateStr = `${days} ${dUnit} ${hours} ${hUnit} ago`;
    }
    return dateStr;
  }
}
