import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { AuthService } from "../services/auth/auth";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Observable,Observer } from 'rxjs/Rx';
import { Group } from '../models/group';
import { Lesson } from '../models/lesson';
import { Word } from '../models/word';

import * as async from "async";
import 'rxjs/add/operator/map';
@Injectable()
export class BackendService{

g_url="http://localhost:1337/";
  auth: AuthService;
  allWords=[];
  constructor(private _loginService:LoginService,
              private _userService: UserService,
              private http:Http,
              private storage:Storage){
                this.auth = AuthService;

              }
getApiUrl(){
                  return this.g_url;
                }
setApiUrl(url:string){
                  this.g_url=url;
                }
  getAllMyGroups(): Observable<Group[]>{
    var url=this.g_url+'groupUser/getAll';
    var id=this._loginService.getUserID();
    var body=JSON.stringify({userID: id});
    return this.http.post(url,body)
    .map((res:Response)=>res.json())

  }
  getAllMyLessons():Observable<Lesson[]>{
    var url=this.g_url+'groupUser/getAll';
    var id=this._loginService.getUserID();
    var body=JSON.stringify({userID: id});

    var url2=this.g_url+'groupLesson/getGroupsLessons';
    return Observable.create((observer: Observer<any>) => {

       this.storage.get('token').then(token => {


        let headers = new Headers();
         headers.append('authorization', 'Bearer ' + token);

         let options = new RequestOptions({ headers: headers });

         this.http.post(url, body, options)
          .flatMap((res:Response)=>res.json())
          .flatMap((group:Group)=>
                   this.http.post(url2,JSON.stringify({groupID:group.id}),options),
                   (group:Group,resp:Response)=>resp.json()
                 )
          .subscribe(result => {
                observer.next(result);
                observer.complete();
            });


       })
     })


  }

  getAllLessonsWords(lessons:Lesson[]):Observable<Word[]>{
    var resp=[];
    var that=this;
    if(lessons.length==1){
      return this.getLessonsWords(lessons[0].id);
    }
    return Observable.create((observer: Observer<any>)=>{
      async.each(lessons, function (lesson, cb) {
          that.getLessonsWords(lesson.id)
          .subscribe(data=>{
            resp.push.apply(resp, data);//dziala jak pythonowe extend
            cb();
          })


        },function(error){
          observer.next(resp);
          observer.complete();
        }

      )

    }
  );



}

  getLessonsWords(lessonID:string): Observable<Word[]>{
    var url=this.g_url+'lessonword/getLessonsWords';
    var body=JSON.stringify({lessonID:lessonID});

    return Observable.create((observer: Observer<any>) => {

       this.storage.get('token').then(token => {

        let headers = new Headers();
        headers.append('authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });

         this.http.post(url, body, options)
          .map((res:Response)=>res.json())
          .subscribe(result => {
                observer.next(result);
                observer.complete();
            });
       })
     })
  }

  getAllGuessed(studentID:string): Observable<any[]>{
    var url=this.g_url+'studentword/getAllGuessed';
    var body=JSON.stringify({studentID:studentID});

    return Observable.create((observer: Observer<any>) => {

       this.storage.get('token').then(token => {

        let headers = new Headers();
        headers.append('authorization', 'Bearer ' + token);
        let options = new RequestOptions({headers:headers});
         this.http.post(url,body,options)
          .map((res:Response)=>res.json())
          .subscribe(result => {
                observer.next(result);
                observer.complete();
            });
       })
     })
  }
  addOrUpdateStudentWord(guessed:boolean,studentID:string,wordID:string){
    var url=this.g_url+'studentword/addOrUpdateStudentWord';

    var body=JSON.stringify({guessed:guessed,studentID:studentID,wordID:wordID});
    return Observable.create((observer: Observer<any>) => {
      this.storage.get('token').then(token => {

       let headers = new Headers();
       headers.append('authorization', 'Bearer ' + token);
       let options = new RequestOptions({headers:headers});

        this.http.post(url, body, options)
         .subscribe(result => {
               observer.next(result);
               observer.complete();
           });
      })
    })
  }

}
