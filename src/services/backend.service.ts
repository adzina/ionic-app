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
              }

  getMyLessons() {

    var userID=this._loginService.getUserID();
    // Use authHttp to access secured routes
    this.storage.get('token').then((token) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get(this.g_url+'user', {
        headers: headers
      }).map(res => res.text())
        .subscribe(
        );
    })
  }
  getAllMyGroups():Observable<Lesson[]>{
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
  getLessonsWords():Observable<any[]>{
    return null;
    // var url=this.g_url+'groupUser/getAll';
    // var id=this._loginService.getUserID();
    // var body=JSON.stringify({userID: id});
    //
    // var url2=this.g_url+'groupLesson/getGroupsLessons';
    // return Observable.create((observer: Observer<any>) => {
    //
    //    this.storage.get('token').then(token => {
    //
    //
    //       let headers = new Headers();
    //      headers.append('Authorization', 'Bearer ' + token);
    //
    //      this.http.post(url, {headers: headers},{body:body})
    //       .flatMap((res:Response)=>res.json())
    //       .flatMap((group:Group)=>
    //                this.http.post(url2, {headers: headers},{body:JSON.stringify({groupID:group.id})}),
    //                (group:Group,resp:Response)=>resp.json()
    //              )
    //       .subscribe(result => {
    //             observer.next(result);
    //             observer.complete();
    //         });
    //
    //
    //    })
    //  })


  }
  // getAllMyLessons(myGroups:Group[]):Observable<Lesson[]>{
  //   var url=this.g_url+'groupLesson/getAllMyLessons';
  //   var body=JSON.stringify({groupID:myGroups});
  //
  //   return Observable.create((observer: Observer<any>) => {
  //
  //      this.storage.get('token').then(token => {
  //
  //
  //         let headers = new Headers();
  //        headers.append('Authorization', 'Bearer ' + token);
  //
  //        this.http.post(url, {headers: headers},{body:body})
  //         .map((res:Response)=>res.json())
  //         .subscribe(result => {
  //               observer.next(result);
  //               observer.complete();
  //           });
  //
  //
  //      })
  //    })
  // }
}
