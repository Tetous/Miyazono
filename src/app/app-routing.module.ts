import { AboutPage } from './pages/about-page/about-page.component';
import { MoreContentPage } from './pages/morecontent-page/morecontent-page.component';
import { SearchPage } from './pages/search-page/search-page.component';
import { WatchPage } from './pages/watch-page/watch-page.component';
import { AnimePage } from './pages/anime-page/anime-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path:'',
    component: MainPage
  },
  {
    path:'anime',
    component: AnimePage
  },
  {
    path:'watch',
    component: WatchPage
  },
  {
    path:'search',
    component: SearchPage
  },
  {
    path:'morecontent',
    component: MoreContentPage
  },
  {
    path:'about',
    component: AboutPage
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
