import {Component} from '@angular/core';
import {DatePicker} from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {BackendService} from '../../services/backend.service';
import {DashboardComponent} from '../dashboard/view-dashboard.component';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import { Group } from '../../models/group';
import { Lesson } from '../../models/lesson';
import {ChooseRevisionLearningComponent} from '../choose-revision-learning/view-choose-revision-learning.component';
@Component({
  selector: 'choose-lesson',
  templateUrl: 'view-choose-lesson.component.html',
})

export class ChooseLessonComponent{

  mode: number;
  from_date: Date;
  until_date: Date;
  lessons: Lesson[];
  lessonsUnique: string[];
  lessonsDate: date[];
  checked: boolean[];
  constructor(private _navCtrl: NavController,
              private _datePicker: DatePicker,
              private _userService: UserService,
              private _backendService: BackendService,
              private _toast: ToastController){
                this.lessonsDate=[];
                this.lessons=this._userService.getAllLessons();
                this.clearChecked();
                this.getDates();


    this.mode=null;
  }
  clearChecked(){
    this.checked=[];
    for(var i=0;i<this.lessons.length;i++){
      this.checked.push(false);
    }
  }
  getDates(){
    var date;
    for (var i=0;i<this.lessons.length;i++){
      date=new Date(this.lessons[i].date);
      this.lessonsDate.push({day: date.getUTCDate(),month: date.getUTCMonth()+1,year: date.getUTCFullYear()});
    }
    console.log(this.lessonsDate);
  }

  submit(){
    var lessonChosen:Lesson[];
    lessonChosen=[];
    for(var i=0;i<this.checked.length;i++){
      if(this.checked[i]){
        lessonChosen.push(this.lessons[i]);
      }
    }
    this._userService.chooseLesson(lessonChosen);
    this._navCtrl.push(ChooseRevisionLearningComponent);


  }
  setmode(m:number){
    this.mode=m;
  }
  from(){
    this._datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => this.from_date=date
            );
  }
  until(){  this._datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => {this.until_date=date;
                    var final_lessons:Lesson[];
                    final_lessons=[];
                    if(this.until_date>this.from_date)
                      {
                        var tmp_date: Date;
                        for(var i=0;i<this.lessons.length;i++){
                          tmp_date=new Date(this.lessons[i].date);
                          if(tmp_date<=this.until_date
                              &&
                              tmp_date>=this.from_date){

                            final_lessons.push(Object.assign({}, this.lessons[i]));
                          }
                        }
                        this._userService.chooseLesson(final_lessons);
                        this._navCtrl.push(DashboardComponent);
                      }
                    else
                      this.presentToast();
                    }
            );
          }
          presentToast2(x:string) {
              let toast = this._toast.create({
                        message: x,
                        duration: 500,
                        position: 'middle'
                      });
                  toast.present();
                }
  presentToast() {
      let toast = this._toast.create({
                message: 'Wrong dates',
                duration: 5000,
                position: 'middle'
              });
          toast.present();
        }
logout(){
  this._navCtrl.push(GoodbyeComponent);
}
}
interface word {
  eng: string;
  pol: string;
  lesson: string;
  id: string;
}
interface date {
  day: number;
  month: number;
  year: number;
}
