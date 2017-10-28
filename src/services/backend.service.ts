import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
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

  g_url='http://localhost:1337/';
  auth: AuthService;
  constructor(private _loginService:LoginService,
              private http:Http,
              private storage:Storage){
                this.auth = AuthService;
                this.http.get('assets/config.json')
                .map(res => res.json())
                .subscribe((api_data) => {
                  this.g_url = api_data.apiUrl;
                });
              }
  //modeluje wydobywanie danych z podwójnej relacji wiele do wielu
  //pobiera wszystkie grupy studenta, a potem dla każdej grupy pobiera wszystkie lekcje
  //zwraca wszystkie lekcje studenta
  getAllMyLessons():Observable<Lesson[]>{
    var url=this.g_url+'groupUser/getAll';
    var id=this._loginService.getUserID();
    var body=JSON.stringify({userID: id});

    var url2=this.g_url+'groupLesson/getGroupsLessons';
    return Observable.create((observer: Observer<any>) => {

       this.storage.get('token').then(token => {


          let headers = new Headers();
         headers.append('Authorization', 'Bearer ' + token);
         this.http.post(url, {headers: headers},{body:body})
          .flatMap((res:Response)=>res.json())
          .flatMap((group:Group)=>
                   this.http.post(url2, {headers: headers},{body:JSON.stringify({groupID:group.id})}),
                   (group:Group,resp:Response)=>resp.json()
                 )
          .subscribe(result => {
                observer.next(result);
                observer.complete();
            });


       })
     })


  }
  getLessonsWords(lessonID:string): Observable<Word[]>{
    var url=this.g_url+'lessonword/getLessonsWords';
    var body=JSON.stringify({lessonID:lessonID});

    return Observable.create((observer: Observer<any>) => {

       this.storage.get('token').then(token => {

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

         this.http.post(url, {headers: headers},{body:body})
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
        headers.append('Authorization', 'Bearer ' + token);

         this.http.post(url, {headers: headers},{body:body})
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
       headers.append('Authorization', 'Bearer ' + token);

        this.http.post(url, {headers: headers},{body:body})
         .subscribe(result => {
           console.log(result);
               observer.next(result);
               observer.complete();
           });
      })
    })
  }


}
