import { ShowNotificationPage } from './../show-notification/show-notification';
import { HomePage } from './../home/home';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component( {
  selector: 'page-welcome-home',
  templateUrl: 'welcome-home.html',
} )
export class WelcomeHomePage {
  books = [];
  User = [];
  CountNot:number;
  Flag:boolean=false;
  UserName: any;
  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage ) { }
  ionViewDidLoad () {
    console.log( "Load" );
    this.bookAPI.GetMostBorrowedBook().
      subscribe( data => {
        this.books = data;
        console.log( this.books );
      } );
    this.bookAPI.GetMostBorrowedUser().
      subscribe( data => {
        this.User = data;
        console.log( this.User );
      } );

  }
  ionViewWillEnter () {
    this.storage.get("LoginEmail").then((LoginEmail)=>{
    this.bookAPI.ShowNotification(LoginEmail).then((res:Array<any>)=>{
      if(this.Flag==true)
      {
        this.CountNot=null;
      }
      else{
      this.CountNot=res.length;
      }
    })});
    this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
      this.bookAPI.GetUserData( LoginEmail ).then(( res ) => {
        this.UserName = res[0].Name;
      } )
    );
  }
  Search () {
    this.navCtrl.push( SearchPage );
  }
  LogOut () {
    this.navCtrl.popToRoot();
    this.storage.remove("LoginEmail");
  }
  notifications () {
    this.Flag=true;
    this.CountNot=null;
    this.navCtrl.push( ShowNotificationPage );
  }
}
