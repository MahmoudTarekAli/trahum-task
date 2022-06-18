import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {BeneficiaryTypesService} from './services/beneficiaryTypes.service';
import {Router} from '@angular/router';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './beneficiaryTypes.component.html',
  styleUrls: ['./beneficiaryTypes.component.scss'],
})
export class BeneficiaryTypesComponent implements OnInit {
  pageIndex = 1;
  beneficiaryTypes: any;
  loading: boolean;
  total: number;
  isActive: boolean;
  @ViewChild('searchInput', {static: true}) search: ElementRef;

  constructor(private categoryService: BeneficiaryTypesService, private router: Router, private nzNotificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.loading = true;
  }

  getInventories(page) {
    this.categoryService.getBeneficiaryTypes(page - 1, 'true').subscribe(data => {
      this.loading = false;
      this.beneficiaryTypes = data.body.data;
      console.log(this.beneficiaryTypes);
      this.total = data.body.length;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex} = params;
    this.getInventories(pageIndex);
  }

  activateBeneficiaryType(e, id) {
    this.categoryService.beneficiaryTypesActivation({is_active: e}, id).subscribe(data => {
      this.getInventories(this.pageIndex);
    });
  }

  deleteCustomer(data, i) {
    this.categoryService.deleteBeneficiaryTypes(data.id).subscribe(res => {
      console.log(res);
      this.beneficiaryTypes.splice(i, 1);
      this.beneficiaryTypes = [...this.beneficiaryTypes];
      this.nzNotificationService.success('Delete Beneficiary Type', 'Delete Beneficiary Type Deleted Successfully')
    });
  }
}
