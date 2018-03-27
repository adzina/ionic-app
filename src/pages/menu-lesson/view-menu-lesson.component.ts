import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { BackendService } from '../../services/backend.service';
import { ChooseRevisionLearningComponent } from '../choose-revision-learning/view-choose-revision-learning.component';
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
      console.log("dostalem z backend");
      console.log(data);
      this._userService.setAllLessons(data);

    });

    this.mode = null;
  }



  setmode(m: number) {
    switch (m) {
      case 0: this._userService.setModeOfResponse(0); this._userService.chooseLessonByNr([0]); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 1: this._userService.setModeOfResponse(1); this._userService.chooseLessonByNr([0]); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 2: this._userService.setModeOfResponse(0); this._userService.chooseLessonByNr([0, 1, 2]); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 3: this._userService.setModeOfResponse(1); this._userService.chooseLessonByNr([0, 1, 2]); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 4: this._userService.setModeOfResponse(0); this._userService.chooseAllLessons(); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 5: this._userService.setModeOfResponse(1); this._userService.chooseAllLessons(); this._navCtrl.push(ChooseRevisionLearningComponent); break;
      case 6: this._navCtrl.push(ChooseLessonComponent); break;
    }
    this.mode = m;
  }
  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
