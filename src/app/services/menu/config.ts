import {ActivatedRoute} from '@angular/router';
import {Permissions} from '../../core/permissions.enum';

export class MenuConfig {
  id: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  calcMenu() {
    const getMenuData: any[] = [
      {
        category: false,
      },
      {
        title: 'Beneficiary Types',
        key: 'beneficiaryTypes',
        icon: 'fe fe-home',
        url: `/beneficiaryTypes`,
      },
    ];
    return getMenuData;
  }

  calcStoreMenu() {
    const getStoreMenu: any[] = [
      {
        category: true,
        title: 'Store',
      },
      {
        title: 'categories',
        key: 'tags',
        icon: 'fe fe-home',
        // roles: ['admin'], // set user roles with access to this route
        count: 2,
        children: [
          {
            title: 'Get Categories',
            key: 'dashboard',
            url: `/store/${this.id}/categories`,
          },
          {
            title: 'Create Category',
            key: 'createCategory',
            url: `/store/${this.id}/categories/add-category`,
          },
        ],
      },
      {
        title: 'charges',
        key: 'charges',
        icon: 'fe fe-home',
        // roles: ['admin'], // set user roles with access to this route
        count: 2,
        children: [
          {
            title: 'Get charges',
            key: 'dashboard',
            url: `/store/${this.id}/charges`,
          },
          {
            title: 'Create charge',
            key: 'createTag',
            url: `/store/${this.id}/charges/add-charge`,
          },
        ],
      },
      {
        title: 'items',
        key: 'items',
        icon: 'fe fe-home',
        // roles: ['admin'], // set user roles with access to this route
        count: 2,
        children: [
          {
            title: 'Get items',
            key: 'dashboard',
            url: `/store/${this.id}/items`,
          },
          {
            title: 'Create item',
            key: 'createTag',
            url: `/store/${this.id}/items/add-item`,
          },
        ],
      },
      {
        title: 'menus',
        key: 'menus',
        icon: 'fe fe-home',
        // roles: ['admin'], // set user roles with access to this route
        count: 1,
        children: [
          {
            title: 'Get menus',
            key: 'dashboard',
            url: `/store/${this.id}/menus`,
          },
        ],
      },
    ];
    return getStoreMenu;
  }
}
