import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

import { Item } from '../../models/item.model';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  doneList:Array<Item> = [];
  constructor( private storage:StorageService) { }

  ngOnInit() {
    this.loadDoneList();
  }
  ionViewDidEnter(){
    this.loadDoneList();
  }
  loadDoneList(){
    this.doneList = [];
    this.doneList = this.storage.getFilteredList(true);
    this.storage.sortList( this.doneList );
  }
  deleteItem( id:number ){
    this.storage.deleteItem(id)
    .then( (response) => {
      if( response ){
        this.loadDoneList();
      }
    })
    .catch( (error) => {
      console.log(error)
    });
  }
  changeStatus( id:number ){
    this.storage.toggleItemStatus(id)
    .then((response) => {
      if( response ){
        this.loadDoneList();
      }
    })
    .catch((error) => { console.log(error) });
  }
}
