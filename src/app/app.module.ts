import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Para hacer funcionar nuestras rutas
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

// Para hacer peticiones HTTP

import { HttpClientModule } from '@angular/common/http';
import { NoImagePipe } from './pipes/noImage/no-image.pipe';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { DomSeguroPipe } from './pipes/domSeguro/dom-seguro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    NoImagePipe,
    CardComponent,
    LoadingComponent,
    DomSeguroPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
