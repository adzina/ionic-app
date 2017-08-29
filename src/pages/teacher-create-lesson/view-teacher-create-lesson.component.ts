import { Component} from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';

@Component({
  selector: 'teacher-create-lesson',
  templateUrl: './view-teacher-create-lesson.component.html'
})
export class TeacherCreateLessonComponent{

  chosenLesson: string;
  today: string;
  constructor(
    private _navCtrl:NavController,
    private _loginService:LoginService,
    private _toast: ToastController) {
      this.today = new Date().toISOString();
    }

  create(){
    /*------------------------------
      create new lesson
    */
    this.presentToast();
    this._navCtrl.pop();
  }
  presentToast() {
    let toast = this._toast.create({
        message: 'New lesson has been created, you can add new words',
        duration: 2500,
        position: 'middle'
      });
  toast.present();
}
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }
}
