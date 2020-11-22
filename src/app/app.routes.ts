import { Routes } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

//Vamos a exportar una constante que será nuestro arreglo de rutas (de path's)
export const ROUTES:Routes = [
    {path: 'artists/:id', component: ArtistsComponent},
    {path: 'home', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'}
];