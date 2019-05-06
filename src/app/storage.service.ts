import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public list:Array<Item> = [];
  public list$:Observable<Item>;
  listKey:string = 'items';

  constructor() { 
    this.readList()
    .then( (data:Array<Item>) => { 
      this.list = data; 
      this.list$ = from(data); 
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  getFilteredList( status:boolean ){
    let data:Array<Item> = this.list.filter((item)=>{
      return item.status == status;
    });
    return data;
  }
  sortList( data:Array<Item> ){
    data.sort((item1,item2) => {
      return item2.id - item1.id;
    });
  }

  storeNewItem( name:string,shopAt:string){
    let item:Item = {name: name,shopAt:shopAt, id: new Date().getTime(), done: 0, status: false };
    console.log(name+"///" +shopAt);
    //this.list$.pipe( map( list => list.push(item) ));
    this.list.push( item );
   this.saveList();
  }
  deleteItem( id:number ){
    console.log("called");

    return new Promise( (resolve,reject) => {
      this.list.forEach( ( item, index ) => {
        if( item.id == id ){
          this.list.splice( index, 1 );
          resolve( true );
          this.saveList();
        }
      });
      reject( new Error('item not found') );
    });
  }
  toggleItemStatus( id:number ){
    return new Promise( (resolve,reject) => {
      this.list.forEach( ( item, index ) => {
        if( item.id == id ){
          if( item.status == false ){
            item.status = true;
            item.done = new Date().getTime();
          }
          else{
            item.status = false;
            item.done = null;
          }
          resolve(true);
          return;
        }
      });
      this.saveList();
      resolve(false);
    });
  }
  saveList(){
    return new Promise( (resolve,reject) => {
      try{
        localStorage.setItem( this.listKey , JSON.stringify(this.list) );
        if( localStorage.getItem( this.listKey ) ){
          //data can be read, so resolve true
          resolve( true );
        }
        else{
          throw('data write failed');
        }
      }
      catch(error){
        reject( error );
      }
    });
  }

  readList(){
    return new Promise( (resolve,reject) => {
      try{
        let data:Array<Item> = JSON.parse( localStorage.getItem( this.listKey ) );
        if( data ){
          this.list = data;
          resolve( data );
        }
        else{
          throw('no data for the requested key');
        }
      }
      catch( error ){
        reject( error );
      }
    });
  }
  destroyData(){
    this.list = [];
    this.saveList()
    .then(( response ) => {
      return response;
    })
    .catch(( error ) => {
      return false;
    });
  }
}
