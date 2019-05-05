import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, IonItemSliding } from '@ionic/angular';

import { Item } from '../../models/item.model';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  tab1Form:FormGroup;
  tab1List:Array<Item> = [];
  //allow us to access the sliding item inside this class
  @ViewChild( IonItemSliding ) slider:IonItemSliding;
  constructor(
    private storage:StorageService,
    private formBuilder:FormBuilder,
    private alertController:AlertController,
  ) 
  { }
  ngOnInit() {
    this.tab1Form = this.formBuilder.group({
      tab1: ['',[ Validators.required, Validators.minLength(3) ]]
    });
    this.loadShoppingList();
  }
  ionViewDidEnter(){
    this.loadShoppingList();
  }
  loadShoppingList(){
    this.tab1List = [];
    this.tab1List = this.storage.getFilteredList(false);
    this.storage.sortList( this.tab1List );
  }
  addItem( name:string ){
    console.log(name);
      this.storage.addItem( name );
      this.tab1Form.reset();
      this.loadShoppingList();
    
  }
  tickOffItem( id:number ){
    this.storage.toggleItemStatus(id)
    .then((response) => {
      if( response == true ){
        this.loadShoppingList();
      }
    })
    .catch( (error) => { console.log(error) });
  }
}
