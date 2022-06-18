import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryTypesService {
  baseUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }

  getBeneficiaryTypes(page, pagination): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', (page).toString());
    params = params.append('pagination', pagination);

    return this.http.get(`${this.baseUrl}/beneficiaryTypes`, {
      params,
      observe: 'response',
    });
  }

  addBeneficiaryTypes(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/beneficiaryTypes`, body, {
      observe: 'response',
    });
  }

  updateBeneficiaryTypes(body, catId): Observable<any> {
    return this.http.put(`${this.baseUrl}/beneficiaryTypes/${catId}`, body, {
      observe: 'response',
    });
  }

  beneficiaryTypesActivation(body, id): Observable<any> {
    return this.http.put(`${this.baseUrl}/beneficiaryTypes/${id}/change-activation`, body, {
      observe: 'response',
    });
  }

  getBeneficiaryType(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/beneficiaryTypes/${id}`, {
      observe: 'response',
    });
  }

  deleteBeneficiaryTypes(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/beneficiaryTypes/${id}`, {
      observe: 'response',
    });
  }
}
