import {ClientComponent} from './client.component';

import {Routes} from '@angular/router';

export const ClientRouting: Routes = [{
  path: '',
  component: ClientComponent,
  data: {
    breadcrumb: 'Client',
    icon: 'icofont-home bg-c-blue',
    status: true
  }
}
];
