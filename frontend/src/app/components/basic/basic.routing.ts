import {Routes} from '@angular/router';
import {BreadcrumbComponent} from './factures/breadcrumb.component';
import {ButtonComponent} from './recus/button.component';
import {TypographyComponent} from './paiements/typography.component';

export const BasicRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Basic Components',
            status: false
        },
        children: [
            {
              path: 'factures',
                component: BreadcrumbComponent,
                data: {
                    breadcrumb: 'Breadcrumb Style',
                    status: true
                }
            }, {
            path: 'recus',
                component: ButtonComponent,
                data: {
                    breadcrumb: 'Button',
                    status: true
                }
            }, {
            path: 'paiements',
                component: TypographyComponent,
                data: {
                    breadcrumb: 'Typography',
                    status: true
                }
            }
        ]
    }
];
