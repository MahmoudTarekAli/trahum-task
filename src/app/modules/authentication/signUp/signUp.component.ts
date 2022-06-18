import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-signup',
  templateUrl: 'signUp.component.html',
  styleUrls: ['signUp.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  mobile: string;
  id: string;
  logo: NzUploadFile[] = [];
  beforeUploadLogo: any;
  beforeUploadLicenses: any;
  licenses: NzUploadFile[] = [];

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
  ) {
    this.beforeUploadLogo = (file: NzUploadFile): boolean => {
      this.logo = [file];
      console.log(this.logo[0]);
      return false;
    };
    this.beforeUploadLicenses = (file: NzUploadFile): boolean => {
      this.licenses = this.licenses.concat(file);
      return false;
    };
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name_en: ['', Validators.required],
      name_ar: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      responsible_name: ['', Validators.required],
      responsible_phone: ['', Validators.required],
      license_number: ['', Validators.required],
      number_of_inventories: ['', Validators.required],
      prefix: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    const data = this.signUpForm.value;
    const formData = new FormData();
    this.logo.forEach((file: any) => {
      formData.append('logo', file);
    });
    this.licenses.forEach((file: any) => {
      formData.append('licence_files', file);
    });
    formData.append('data', JSON.stringify(data));
    this.authService.signUp(formData).subscribe(company => {
      this.notification.success('Congratulation', 'you have signed up successfully, please wait for our approval');
      this.router.navigateByUrl('auth');
    }, error => {
      this.notification.error('failed to sign up', error.error.message[0]);
    });
  }
}
