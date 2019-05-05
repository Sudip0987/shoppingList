import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentlistPipe } from '../currentlist.pipe';

// This module is to allow the tonow pipe to be imported into modules
@NgModule({
  declarations: [CurrentlistPipe],
  imports: [
    CommonModule
  ],
  exports: [CurrentlistPipe]
})
export class TonowModule { 
  static forRoot() {
    return {
        ngModule: TonowModule,
        providers: [],
    };
  }
}
