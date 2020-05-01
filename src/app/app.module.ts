import { AnimeData } from './services/animeData.service';
import { AnimeService } from './services/anime.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPage } from './pages/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnimePage } from './pages/anime-page/anime-page.component';
import { WatchPage } from './pages/watch-page/watch-page.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SearchPage } from './pages/search-page/search-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MoreContentPage } from './pages/morecontent-page/morecontent-page.component';
import { AboutPage } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    NavbarComponent,
    AnimePage,
    WatchPage,
    PreloaderComponent,
    SearchPage,
    SearchBarComponent,
    MoreContentPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AnimeService,
    AnimeData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
