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
  user: string;
  clicked: boolean;
  chosenLesson: Lesson[];
  modeOfWords: number;
  modeOfResponse:number;
  eng2pol: boolean;
  dataReady:boolean;
  showHint:boolean;
  userID: string;
  constructor(
    private _backendService: BackendService,
    private _loginService: LoginService,
    private _userService: UserService,
    private _toast: ToastController,
    public _navCtrl: NavController) {
    this.response = null;
    this.ok = null;
    this.clicked = false;
    this.allWords=[];
    this.words=[];
    this.modeOfWords = this._userService.getModeWords();
    this.chosenLesson = this._userService.getLesson();
    this.modeOfResponse = this._userService.getModeOfResponse();
    this.userID = this._loginService.getUserID();
    this.eng2pol = true;
    this.dataReady = false;
    this.showHint = false;
    this._backendService.getAllLessonsWords(this.chosenLesson).subscribe(
      data => {
        console.log(data);
        this.allWords = data;
        this.words = this.allWords.concat();
        if(this.modeOfWords){
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
  }

   presentToast() {
     let toast = this._toast.create({
         message: 'All words from this lesson have been memorised, choose \'Revise\' to access them again ',
         duration: 5000,
         position: 'middle'
       });
   toast.present();
 }
 findWordInAllWords(){
   for(var i=0;i<this.allWords.length;i++){
     if(this.allWords[i].id ==this.wordToGuess.id){
       return i
     }
   }
 }
  prepareOptions() {
    this.options = [];
    var length = this.allWords.length;
    //rand to index wylosowanego slowa do odgadnięcia
    var rand = Math.floor(Math.random() * this.words.length);
    //how_far mówi o ile wyrazów w lewo lub w prawo od wybranego slowa się przesuniemy
    var how_far = Math.floor(Math.random() * 4);
    if(this.words.length==0){
      this.presentToast();
      this.wordToGuess={id:"0",polish:"", english:"", comment:""}
      return 0;
    }
    this.wordToGuess = this.words[rand];
    rand = this.findWordInAllWords()
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

    console.log(how_far)
    console.log(rand)
    this.dataReady=true;
  }
  assign(x: string) {
    this.showHint = true;
    if (!this.clicked) {
      this.clicked = true;
      this.response = x;
      if(this.eng2pol)
        this.ok = this.response.toLowerCase() == this.wordToGuess.polish.toLowerCase() ? true : false;
      else
        this.ok = this.response.toLowerCase() == this.wordToGuess.english.toLowerCase() ? true : false;

    }
  }
  swipeEvent(e) {
    if (e.direction == '2') {
      this.nextword();
    }
  }
  nextword() {
    if (this.clicked) {
      this._backendService.addOrUpdateStudentWord(this.ok, this.userID, this.wordToGuess.id).subscribe(data => {
        this._backendService.getAllGuessed(this._loginService.getUserID()).subscribe(guessed => {
          if (guessed != null && this.modeOfWords) {
            for (var i = 0; i < guessed.length; i++) {
              for (var j = 0; j < this.words.length; j++) {
                if (this.words[j].id == guessed[i].wordID) {
                  this.words.splice(j, 1); break;
                }
              }
            }
          }
          this.clicked = false;
          this.response = null;
          this.showHint = false;
          this.ok = null;
          this.eng2pol=!this.eng2pol;
          this.prepareOptions();
        })
      })
    }
  }
  toggleHint(){
    this.showHint = !this.showHint;
  }
  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
