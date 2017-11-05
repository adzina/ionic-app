import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackendService } from '../../services/backend.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { GoodbyeComponent } from '../goodbye/view-goodbye.component';
import { Lesson } from '../../models/lesson';
import { Word } from '../../models/word';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'dashboard',
  templateUrl: 'view-dashboard.component.html'
})

export class DashboardComponent {
  //tablica zawierajaca tylko slowka pozostale do nauki
  words: Word[];
  //talica zawierająca wszystkie slowka studenta
  allWords: Word[];
  options: Word[];
  wordToGuess: Word;
  response: string;
  ok: boolean;
  wordsReady: boolean;
  user: string;
  clicked: boolean;
  chosenLesson: Lesson[];
  mode: number;
  modeWords:number;
  constructor(
    private _backendService: BackendService,
    private _loginService: LoginService,
    private _userService: UserService,
    private _toast: ToastController,
    public _navCtrl: NavController) {
    this.response = null;
    this.ok = null;
    this.wordsReady = false;
    this.clicked = false;
    this.allWords=[];
    this.words=[];
    this.mode = this._userService.getMode();
    this.chosenLesson = this._userService.getLesson();
    this.modeWords = this._userService.getModeWords();

    this._backendService.getAllLessonsWords(this.chosenLesson).subscribe(
      data => {
        console.log(data);
        this.allWords = data;
        this.words = this.allWords.concat();
        if(this.modeWords){
            this._backendService.getAllGuessed(this._loginService.getUserID()).subscribe(guessed => {
              if (guessed != null) {
                for (var i = 0; i < guessed.length; i++) {
                  for (var j = 0; j < this.words.length; j++) {
                    if (this.words[j].id == guessed[i].wordID) {
                      this.words.splice(j, 1); break;
                    }
                  }
                }
              }
              if(this.words.length!=0)
                this.prepareOptions();
              else{
                  this.presentToast();
              }
            })
        }
        else{
          this.prepareOptions();
        }
      }
    )
    //this.lessonsFiltered=this.lessons.filter((l:word) => l.lesson===this.chosenLesson);
  }

   presentToast() {
     let toast = this._toast.create({
         message: 'All words from this lesson have been memorised, choose \'Revise\' to access them again ',
         duration: 5000,
         position: 'middle'
       });
   toast.present();
 }
  prepareOptions() {
    this.options = [];
    var length = this.allWords.length;
    //rand to index wylosowanego slowa do odgadnięcia
    var rand = Math.floor(Math.random() * this.words.length);

    //how_far mówi o ile wyrazów w lewo lub w prawo od wybranego slowa się przesuniemy
    var how_far = Math.floor(Math.random() * 4);
    this.wordToGuess = this.words[rand];
    var j = 0;
    var i;
    if (rand + how_far < length && rand - (3-how_far)>=0) {console.log("pierwszy");
      for (i = rand-(3-how_far); i <= rand + how_far; i++) {
        this.options[j] = this.allWords[i];
        j++;
      }
    }
    else if (rand + how_far < length && rand- (3-how_far)<0) {console.log("drugi");
      for (i = length + rand - (3 - how_far); i < length; i++) {
        this.options[j] = this.allWords[i];
        j++;
      }
      for (i = 0; i <= rand + how_far; i++) {
        this.options[j] = this.allWords[i];
        j++;
      }
    }
    else if(rand + how_far >= length && rand - (3 - how_far) >=0 ) {console.log("trzeci");
      for (i = rand - (3 - how_far); i < length; i++) {
        this.options[j] = this.allWords[i];
        j++;
      }
      for (i=0;i<=rand+how_far-length;i++){
        this.options[j] = this.allWords[i];
        j++;
      }

    }
    else{console.log("czwarty");
      for(i=0;i<length;i++){
        this.options[i] = this.allWords[i];
      }
    }
    console.log(this.words);
    console.log("rand"+rand);
    console.log("how_far"+how_far);
    console.log(this.options);
    this.wordsReady = true;
  }
  assign(x: string) {
    if (!this.clicked) {
      this.clicked = true;
      this.response = x;
      this.ok = this.response == this.wordToGuess.polish ? true : false;
    }
  }
  swipeEvent(e) {
    if (e.direction == '2') {
      this.nextword();
    }
  }
  nextword() {
    var userID = this._loginService.getUserID();

    if (this.clicked) {
      this._backendService.addOrUpdateStudentWord(this.ok, userID, this.wordToGuess.id).subscribe(data => {
        this._backendService.getAllGuessed(this._loginService.getUserID()).subscribe(guessed => {
          if (guessed != null && this.modeWords) {
            for (var i = 0; i < guessed.length; i++) {
              for (var j = 0; j < this.words.length; j++) {
                if (this.words[j].id == guessed[i].wordID) {
                  this.words.splice(j, 1); break;
                }
              }
            }
          }
          this.clicked = false;
          this.prepareOptions();
          this.response = null;
          this.ok = null;
        })
      })
    }
  }
  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
