import {Routes} from '@angular/router';
import {OuvrierComponent} from './ouvrier.component';

export const OuvrierRouting: Routes = [{
  path: '',
  component: OuvrierComponent,
  data: {
    breadcrumb: 'Ouvrier',
    icon: 'icofont-home bg-c-blue',
    status: true
  }
}
];
