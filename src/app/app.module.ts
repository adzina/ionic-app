import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {IonicStorageModule} from '@ionic/storage'
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { LanguageApp } from './app.component';
import { HttpModule, Http, RequestOptions,ConnectionBackend } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';

import {TeacherChooseLessonsComponent} from '../pages/teacher-choose-lessons/teacher-choose-lessons.component';
import { LoginComponent } from '../pages/login/view-login.component';
import { RegisterComponent} from '../pages/register/view-register.component';
import {ChooseModeComponent} from '../pages/choose-mode/view-choose-mode.component';
import {ChooseLessonComponent} from '../pages/choose-lesson/view-choose-lesson.component';
import {DashboardComponent} from '../pages/dashboard/view-dashboard.component';
import {TeacherDashboardComponent} from '../pages/teacher-dashboard/view-teacher-dashboard.component';
import {TeacherAddStudentsComponent} from '../pages/teacher-add-students/view-teacher-add-students.component';
import {TeacherCreateLessonComponent} from '../pages/teacher-create-lesson/view-teacher-create-lesson.component';
import {TeacherWordsPanelComponent} from '../pages/teacher-words-panel/view-teacher-words-panel.component';
import {ProgressComponent} from '../pages/progress/view-progress.component';
import {GoodbyeComponent} from '../pages/goodbye/view-goodbye.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';
import {BackendService} from '../services/backend.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    /*
        headerName: 'Authorization',
        headerPrefix: 'bearer',
        tokenGetter: (() => localStorage.getItem(this.tokenName)),
        */
  }), http, options);
}
@NgModule({
  declarations: [
    LanguageApp,
    TeacherChooseLessonsComponent,
    LoginComponent,
    RegisterComponent,
    ChooseModeComponent,
    ChooseLessonComponent,
    ProgressComponent,
    DashboardComponent,
    TeacherDashboardComponent,
    TeacherAddStudentsComponent,
    TeacherCreateLessonComponent,
    TeacherWordsPanelComponent,
    GoodbyeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(LanguageApp),
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    LanguageApp,
    TeacherChooseLessonsComponent,
    LoginComponent,
    RegisterComponent,
    ChooseModeComponent,
    ChooseLessonComponent,
    ProgressComponent,
    DashboardComponent,
    TeacherDashboardComponent,
    TeacherCreateLessonComponent,
    TeacherAddStudentsComponent,
    TeacherWordsPanelComponent,
    GoodbyeComponent
  ],
  providers: [{
   provide: AuthHttp,
   useFactory: authHttpServiceFactory,
   deps: [ Http, RequestOptions ]
 },
    DatePicker,
    LoginComponent,
    ToastController,
    StatusBar,
    SplashScreen,
    LoginService,
    BackendService,
    UserService,
    HttpModule,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
