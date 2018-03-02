import {Routes} from '@angular/router';
import {ClientComponent} from './client.component';

export const AdvanceRoutes: Routes = [{
  path: '', component: ClientComponent, data: {
    breadcrumb: 'Client', status: true
  }
}]
