import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { SupplierFormComponent } from './pages/supplier-form/supplier-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SupplierDialogComponent } from './pages/supplier-dialog/supplier-dialog.component';

export const routes: Routes = [

    { path: 'login', component: LoginFormComponent },
    { path: 'suppliers', component: SupplierFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
