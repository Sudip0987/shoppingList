import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { StorageService } from '../app/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this hides the status bar in Android
      // this.statusBar.styleDefault();
      this.statusBar.show();
      this.splashScreen.hide();
      //when the app is paused, save data
      document.addEventListener('pause',()=>{
        this.storage.saveList();
      },false);
      //when the app is resumed, load data
      document.addEventListener('resume',()=>{
        this.storage.readList();
      },false);
    });
  }
}
