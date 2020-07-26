import {INavData} from '@coreui/angular';
import {NavEnum} from "./_nav-enum";

export const navItems: INavData[] = [
  {
    name: NavEnum.Dashboard,
    url: '/dashboard',
    icon: 'icon-speedometer'
  }, {
    title: true,
    name: 'Gestion chantiers'
  }, {
    name: NavEnum.Chantiers,
    url: '/chantiers',
    icon: 'icon-home'
  }, {
    title: true,
    name: 'Gestion Transactions'
  },
  {
    name: NavEnum.Caisse,
    url: '/caisse',
    icon: 'fa fa-money',
    children: [
      {
        name: 'Paiements',
        url: '/transactions/caisse/paiements',
        icon: 'icon-puzzle'
      }, {
        name: NavEnum.Mouvements,
        url: '/transactions/mouvements',
        icon: 'icon-credit-card'
      },
    ]
  }, {
    title: true,
    name: 'Gestion de personnes'
  }, {
    name: NavEnum.Clients,
    url: '/personnes/clients',
    icon: 'fa fa-user-circle-o'
  }, {
    name: NavEnum.Ouvriers,
    url: '/personnes/ouvriers',
    icon: 'fa fa-group'
  }, {
    name: NavEnum.Utilisateurs,
    url: '/personnes/utilisateurs',
    icon: 'fa fa-user-o'
  }, {
    title: true,
    name: 'Parametrages'
  }, {
    name: NavEnum.Agence,
    url: '/parametrage/agence',
    icon: 'fa fa-wrench'
  }, {
    name: NavEnum.Credits,
    url: 'https://coreui.io/',
    icon: 'icon-info'
  },
];
