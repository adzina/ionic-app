import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService } from "../../services/user.service";
import { ProgressComponent } from "../progress/view-progress.component";
import { GoodbyeComponent } from "../goodbye/view-goodbye.component";
import { ChooseLessonComponent } from "../choose-lesson/view-choose-lesson.component";

@Component({
  selector: "choose-mode",
  templateUrl: "view-choose-mode.component.html"
})
export class ChooseModeComponent {
  mode: number;
  constructor(
    private _userService: UserService,
    public _navCtrl: NavController
  ) {
    this.mode = null;
  }
  setmode(m: number) {
    if (m != 2) {
      this._userService.setModeOfResponse(m);
      this._navCtrl.push(ChooseLessonComponent);
    } else {
      this._navCtrl.push(ProgressComponent);
    }
  }

  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
