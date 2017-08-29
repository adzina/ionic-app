import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { LanguageApp } from './app.component';

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
    IonicModule.forRoot(LanguageApp)
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
  providers: [
    DatePicker,
    ToastController,
    StatusBar,
    SplashScreen,
    LoginService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
