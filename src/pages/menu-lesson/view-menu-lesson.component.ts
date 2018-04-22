import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { BackendService } from '../../services/backend.service';
import { ProgressComponent } from '../progress/view-progress.component';
import { GoodbyeComponent } from '../goodbye/view-goodbye.component';
import { Group } from '../../models/group';
import { Lesson } from '../../models/lesson';
import { ChooseLessonComponent } from '../choose-lesson/view-choose-lesson.component';
@Component({
  selector: 'menu-lesson',
  templateUrl: 'view-menu-lesson.component.html',
})

export class MenuLessonComponent {

  mode: number;
  constructor(private _navCtrl: NavController,
    private _userService: UserService,
    private _backendService: BackendService,
    private _toast: ToastController) {

    this._backendService.getAllMyLessons().subscribe(data => {

      this._userService.setAllLessons(data);

    });

    this.mode = null;
  }



  setmode(m: number) {
    if(m)
      this._navCtrl.push(ProgressComponent);
    else
      this._navCtrl.push(ChooseLessonComponent);
  }
  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
