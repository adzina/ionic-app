import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService } from "../../services/user.service";
import { BackendService } from "../../services/backend.service";
import { ProgressComponent } from "../progress/view-progress.component";
import { GoodbyeComponent } from "../goodbye/view-goodbye.component";
import { ChooseLessonComponent } from "../choose-lesson/view-choose-lesson.component";
import { ChangePasswordComponent } from "../change-password/view-change-password.component";
@Component({
  selector: "menu-lesson",
  templateUrl: "view-menu-lesson.component.html"
})
export class MenuLessonComponent {
  mode: number;
  constructor(
    private _navCtrl: NavController,
    private _userService: UserService,
    private _backendService: BackendService
  ) {
    this._backendService.getAllMyLessons().subscribe(data => {
      this._userService.setAllLessons(data);
    });
    this.mode = null;
  }

  setmode(m: number) {
    switch(m) {
      case 0: this._navCtrl.push(ChooseLessonComponent);break;
      case 1: this._navCtrl.push(ProgressComponent);break;
      case 2: this._navCtrl.push(ChangePasswordComponent);break;
    }
  }
  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
