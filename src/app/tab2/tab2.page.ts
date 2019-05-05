import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, IonItemSliding } from '@ionic/angular';

import { Item } from '../../models/item.model';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tab2Form:FormGroup;
  shoppedList:Array<Item> = [];
  //allow us to access the sliding item inside this class
  @ViewChild( IonItemSliding ) slider:IonItemSliding;
  constructor(
    private storage:StorageService,
    private formBuilder:FormBuilder,
    private alertController:AlertController,
  ) 
  { }
  ngOnInit() {
    this.tab2Form = this.formBuilder.group({
      tab2: ['',[ Validators.required, Validators.minLength(3) ]]
    });
    this.loadShoppingList();
  }
  ionViewDidEnter(){
    this.loadShoppingList();
  }
  loadShoppingList(){
    this.shoppedList = [];
    this.shoppedList = this.storage.getFilteredList(true);
    this.storage.sortList( this.shoppedList );
  }
  addItem( name:string ){
    console.log(name);
      this.storage.addItem( name );
      this.tab2Form.reset();
      this.loadShoppingList();
    
  }
  deleteItem( id:number ){
    this.storage.deleteItem(id)
    .then( (response) => {
      if( response ){
        this.loadShoppingList();
      }
    })
    .catch( (error) => {
      console.log(error)
    });
}






}