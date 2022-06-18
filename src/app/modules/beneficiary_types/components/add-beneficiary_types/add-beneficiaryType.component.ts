import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BeneficiaryTypesService } from '../../services/beneficiaryTypes.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-beneficiaryType.component.html',
  styleUrls: ['./add-beneficiaryType.component.scss'],
})
export class AddBeneficiaryTypeComponent implements OnInit {
  CustomerForm: FormGroup;
  isUpdate: boolean;
  data: any;
  loading: boolean;
  companyId = localStorage.getItem('userId');

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private notification: NzNotificationService, private categoryService: BeneficiaryTypesService) {

  }

  ngOnInit(): void {
    this.CustomerForm = this.fb.group({
      name_ar: ['', [Validators.required]],
      name_en: ['', [Validators.required]],
    });
    if (this.activeRoute.snapshot.params.id) {
      this.isUpdate = true;
      if (this.data === undefined) {
        this.categoryService.getBeneficiaryType(this.activeRoute.snapshot.params.id).subscribe(data => {
          this.data = data.body;
          this.setValues();
        });
      } else {
        this.setValues();
      }
    } else {
      this.isUpdate = false;
    }
  }

  setValues() {
    this.CustomerForm.patchValue(this.data);
  }

  submit() {
    this.loading = true;
    const payload = this.CustomerForm.value;
    if (this.isUpdate === false) {
      this.categoryService.addBeneficiaryTypes(payload).subscribe(data => {
        this.notification.success(`Create beneficiary type `, 'beneficiary type Created Successfully');
        this.router.navigateByUrl(`/beneficiaryTypes`);
        this.loading = false;
      }, error => {
        this.notification.error('error', error.error.message);
        this.loading = false;
      });
    } else {
      this.categoryService.updateBeneficiaryTypes(payload, this.activeRoute.snapshot.params.id).subscribe(data => {
        this.notification.success(`Update beneficiary type `, 'beneficiary type Updated Successfully');
        this.loading = false;
        this.router.navigateByUrl(`/beneficiaryTypes`);
      }, error => {
        this.notification.error('error', error.error.message);
        this.loading = false;
      });
    }
  }
}
