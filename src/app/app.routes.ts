import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EncryptComponent } from './encrypt/encrypt.component';
import { DecryptComponent } from './decrypt/decrypt.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'encrypt', component: EncryptComponent},
    {path: 'decrypt', component: DecryptComponent},
    {path: '**', component: PageNotFoundComponent} 
];