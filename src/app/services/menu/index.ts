import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { MenuConfig } from './config'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}


  getMenuConfig() {
    return MenuConfig
  }
}
