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
  constructor(private _navCtrl: NavController,
              private _datePicker: DatePicker,
              private _userService: UserService,
              private _backendService: BackendService,
              private _toast: ToastController){
                this.lessonsDate=[];
                //-----------------------------------------------------------------------------
                // this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
                // this.lessonsUnique=[];
                // this.onlyUniqueLessons();
                //------------------------------------------------------------------------------
                this._backendService.getAllMyLessons().subscribe(data=>{
                  //console.log(data);
                  this.lessons=data;

                  this.sortLessons();
                  this.getDates();
                });

    this.mode=null;
  }
  getDates(){
    var date;
    for (var i=0;i<this.lessons.length;i++){
      date=new Date(this.lessons[i].date);
      this.lessonsDate.push({day: date.getUTCDate(),month: date.getUTCMonth()+1,year: date.getUTCFullYear()});
    }
    console.log(this.lessonsDate);
  }
  sortLessons(){
    this.lessons.sort( function(lesson1, lesson2) {
	    if ( lesson1.date < lesson2.date ){
	    	return -1;
	    }else if( lesson1.date > lesson2.date ){
	        return 1;
	    }else{
	    	return 0;
	    }
	});

  }
  choose(i: number) {
    var lessonChosen:Lesson[];
    lessonChosen=[];
    lessonChosen.push(this.lessons[i]);
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

                            final_lessons.push(this.lessons[i]);
                          }
                        }
                        this.presentToast2(final_lessons[0].subject);
                        this.presentToast2(final_lessons[1].subject);
                        this.presentToast2(final_lessons[2].subject);
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
