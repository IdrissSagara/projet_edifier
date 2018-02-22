import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    main: [
      {
        state: 'chantier',
        name: 'Chantier',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'basic',
        name: 'Caisse',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'breadcrumb',
            name: 'Factures'
          },
          {
            state: 'button',
            name: 'Reçus'
          },
          {
            state: 'typography',
            name: 'Paiements'
          }
        ]
      },
      {
        state: 'advance',
        name: 'Clients',
        type: 'link',
        icon: 'ti-crown'
      },
    ]
  },
  {
    main: [
      {
        state: 'forms',
        name: 'Budget',
        type: 'link',
        icon: 'ti-layers'
      },
      {
        state: 'bootstrap-table',
        name: 'Ouvrier',
        type: 'link',
        icon: 'ti-receipt'
      }
    ],
  },
  {
    main: [
      {
        state: 'map',
        name: 'Maps',
        type: 'link',
        icon: 'ti-map-alt'
      },
      {
        state: 'authentication',
        name: 'Mouvement d\'argent',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Entrant',
            target: true
          },
          {
            state: 'forgot',
            name: 'Sortant',
            target: true
          },
        ]
      },
    ]
  },
  /**
   *
   main: [
   {
     state: '',
     name: 'Menu Levels',
     type: 'sub',
     icon: 'ti-direction-alt',
     children: [
       {
         state: '',
         name: 'Menu Level 2.1',
         target: true
       }, {
         state: '',
         name: 'Menu Level 2.2',
         type: 'sub',
         children: [
           {
             state: '',
             name: 'Menu Level 2.2.1',
             target: true
           },
           {
             state: '',
             name: 'Menu Level 2.2.2',
             target: true
           }
         ]
       }, {
         state: '',
         name: 'Menu Level 2.3',
         target: true
       }, {
         state: '',
         name: 'Menu Level 2.4',
         type: 'sub',
         children: [
           {
             state: '',
             name: 'Menu Level 2.4.1',
             target: true
           },
           {
             state: '',
             name: 'Menu Level 2.4.2',
             target: true
           }
         ]
       }
     ]
   }
   ]
   */
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
