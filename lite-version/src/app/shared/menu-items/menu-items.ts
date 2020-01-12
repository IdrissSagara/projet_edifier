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
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard', //  state represente le nom du component concerné
        name: 'Tableau de bord', // name est le nom affiché sur la page
        type: 'link', // type du menu, si celui-ci est un menu simple (link) ou un menu avec sous-menu (sub)
        icon: 'ti-home' // icon qui sera affiché a gauche du menu, http://themify.me/themify-icons
      },
    ],
  },
  {
    label: 'chantier',
    main: [
      {
        state: 'chantier',
        name: 'Chantiers',
        type: 'link',
        icon: 'ti-home'
      },
    ],
  },
  {
    label: 'Clients',
    main: [
      {
        state: 'client',
        name: 'Clients',
        type: 'link',
        icon: 'ti-crown'
      }
    ]
  },
  {
    label: 'Budget',
    main: [
      {
        state: 'budget',
        name: 'Budget',
        type: 'link',
        icon: 'ti-layers'
      }
    ]
  }, {
    label: 'Ouvrier',
    main: [
      {
        state: 'ouvrier',
        name: 'Ouvrier',
        type: 'link',
        icon: 'ti-receipt'
      }
    ]
  }, {
    label: 'Caisse',
    main: [
      {
        state: 'caisse',
        name: 'Caisse',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'facture',
            name: 'Factures'
          },
          {
            state: 'paiement',
            name: 'Paiement'
          },
          {
            state: 'recu',
            name: 'reçu'
          }
        ]
      },
    ]
  },
  {
    label: 'Transaction',
    main: [
      {
        state: 'mouvement',
        name: 'Mouvement',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'entrant',
            name: 'Mouvement entrant'
          },
          {
            state: 'sortant',
            name: 'Mouvement sortant'
          }
        ]
      },
    ]
  }, {
    label: 'Utilisateur',
    main: [
      {
        state: 'utilisateur',
        name: 'Utilisateur',
        type: 'link',
        icon: 'ti-settings'
      }
    ]
  },
  /*
  {
    label: 'Pages',
    main: [
      {
        state: 'auth',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          }, {
            state: 'registration',
            type: 'link',
            name: 'Registration',
            target: true
          }
        ]
      }
    ]
  },
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
