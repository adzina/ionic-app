import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BackendService } from "../../services/backend.service";
import { GoodbyeComponent } from "../goodbye/view-goodbye.component";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from "ionic-angular";

@Component({
  selector: "change-password",
  templateUrl: "view-change-password.component.html"
})
export class ChangePasswordComponent {
  old_password: string = "";
  new_password: string = "";
  
  constructor(
    private _navCtrl: NavController,
    private _backendService: BackendService,
    private _toast: ToastController
  ) {}

  submit() {
    if (this.old_password == "" || this.new_password == "") {
      this.presentToast("Empty field!");
    } else {
      this._backendService
        .updateMyProfile(this.old_password, this.new_password)
        .subscribe(
          data => {
            this.presentToast("Password changed sucessfully!");
          },
          (error: HttpErrorResponse) => {
            this.presentToast(`Backend error ${error}`);
          }
        );
    }
  }
  presentToast(msg: string) {
    let toast = this._toast.create({
      message: msg,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  logout() {
    this._navCtrl.push(GoodbyeComponent);
  }
}
