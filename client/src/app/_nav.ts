import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  }, {
    title: true,
    name: 'Gestion chantiers'
  }, {
    name: 'Chantiers',
    url: '/chantiers',
    icon: 'icon-home'
  }, {
    title: true,
    name: 'Gestion Transactions'
  },
  {
    name: 'Caisse',
    url: '/caisse',
    icon: 'fa fa-money',
    children: [
      {
        name: 'Paiements',
        url: '/transactions/caisse/paiements',
        icon: 'icon-puzzle'
      },
    ]
  }, {
    name: 'Mouvements',
    url: '/transactions/mouvements',
    icon: 'icon-credit-card'
  }, {
    title: true,
    name: 'Gestion de personnes'
  }, {
    name: 'Clients',
    url: '/personnes/clients',
    icon: 'fa fa-user-circle-o'
  }, {
    name: 'Ouvriers',
    url: '/personnes/ouvriers',
    icon: 'fa fa-group'
  }, {
    name: 'Utilisateurs',
    url: '/personnes/utilisateurs',
    icon: 'fa fa-user-o'
  }, {
    title: true,
    name: 'Parametrages'
  }, {
    name: 'Agence',
    url: '/parametrage/agence',
    icon: 'fa fa-wrench'
  },
];
