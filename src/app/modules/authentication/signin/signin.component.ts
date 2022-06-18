import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isLogin = true;
  token: string;
  id: string;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      user => {
        if (user.status === 200) {
          this.authService.saveUserData(user.body);
          this.authService.saveToken(user?.body?.jwt_token);
          this.authService.saveUserId(user?.body?.id);
          this.router.navigateByUrl('/beneficiaryTypes');
        }
      },
      error => {
        this.notification.error(this.translate.instant('failed.login'), error.error.message);
      },
    );
  }
}
