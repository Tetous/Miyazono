import { Router, NavigationExtras } from '@angular/router';
import { AnimeData } from './../../services/animeData.service';
import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'morecontent-page',
  templateUrl: './morecontent-page.component.html',
  styleUrls: ['./morecontent-page.component.css']
})
export class MoreContentPage implements OnInit {

  movies = []
  tvShows = []
  ovas = []
  specials = []

  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentState = {
    tvShowsState: this.states.loading,
    ovaState: this.states.loading,
    specialsState: this.states.loading,
    movieState: this.states.loading
  }

  constructor(private animeService: AnimeService, private animeData: AnimeData, private router: Router) {


    if (animeData.latestAnimes == undefined) {

      this.getTvShows();
    } else {
      this.tvShows = animeData.latestAnimes
      this.currentState.tvShowsState = this.states.loaded

    }
    if (animeData.latestMovies == undefined) {

      this.getMovies();
    } else {
      this.movies = animeData.latestMovies
      this.currentState.movieState = this.states.loaded

    }
    if (animeData.latestOvas == undefined) {

      this.getOvas();
    } else {
      this.ovas = animeData.latestOvas
      this.currentState.ovaState = this.states.loaded

    }
    if (animeData.latestSpecials == undefined) {
      this.getSpecials();
    } else {
      this.specials = animeData.latestSpecials
      this.currentState.specialsState = this.states.loaded

    }

  }

  getTvShows() {
    this.currentState.tvShowsState = this.states.loading

    this.animeService.getTv("default", 1).subscribe(shows => {
      this.tvShows = shows["tv"]
      this.animeData.latestAnimes = this.tvShows
      this.currentState.tvShowsState = this.states.loaded
    }, () => {
      this.currentState.tvShowsState = this.states.error

    })

  }

  getMovies() {
    this.currentState.movieState = this.states.loading

    this.animeService.getMovies("default", 1).subscribe(movies => {
      this.movies = movies["movies"]
      this.animeData.latestMovies = this.movies
      this.currentState.movieState = this.states.loaded
    }, () => {
      this.currentState.movieState = this.states.error

    })

  }

  getOvas() {
    this.currentState.ovaState = this.states.loading

    this.animeService.getOva("default", 1).subscribe(ovas => {
      this.ovas = ovas["ova"]
      this.animeData.latestOvas = this.ovas

      this.currentState.ovaState = this.states.loaded
    }, () => {
      this.currentState.ovaState = this.states.error

    })

  }

  getSpecials() {
    this.currentState.specialsState = this.states.loading

    this.animeService.getSpecial("default", 1).subscribe(specials => {
      this.specials = specials["special"]
      this.animeData.latestSpecials = this.specials
      this.currentState.specialsState = this.states.loaded
    }, () => {
      this.currentState.specialsState = this.states.error

    })

  }

  scroll(element: HTMLElement, event) {
    event.preventDefault()
    let scrollValue = element.scrollLeft
    let scrollAmount = event.deltaY < 0 ? scrollValue + 150 : scrollValue - 150
    element.scroll({ left: scrollAmount })
  }

  changeAnimePage(anime) {
    this.animeData.data = anime;
    let extras: NavigationExtras = {
      queryParams: {
        "animeName": anime.title,
        "animeId": anime.id
      }
    }
    this.router.navigate(["/anime"], extras)
  }

  ngOnInit(): void {
  }

}
