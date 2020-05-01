import { NavigationExtras, Router } from '@angular/router';
import { AnimeData } from './../../services/animeData.service';
import { AnimeService } from './../../services/anime.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPage implements OnInit {
  episodes = []
  animes = []
  episodesLoaded = false;
  animesLoaded = false;
  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentEpisodeState = this.states.loading
  currentAnimeState = this.states.loading

  constructor(private animeService: AnimeService, private animeData: AnimeData, private router: Router) {

    if (animeData.latestAnimes == undefined) {
      this.getLatestAnimes();
    } else {
      this.animes = animeData.latestAnimes
      this.currentAnimeState = this.states.loaded
    }

    if (animeData.latestEpisodes == undefined) {
      this.getLatestEpisodes();
    } else {
      this.episodes = animeData.latestEpisodes
      this.currentEpisodeState = this.states.loaded

    }


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

  changeEpisodePage(episode) {
    this.animeData.episodeData = {
      title: episode.title,
      number: episode.episode,
      servers: episode.servers
    }
    let extras: NavigationExtras = {
      queryParams: {
        "episodeId": episode.id,
        "episodeTitle": episode.title,
        "episodeNumber": episode.episode,

      }
    }
    this.router.navigate(["/watch"], extras)
  }

  getLatestEpisodes() {
    this.animeService.getLatestEpisodes().subscribe((data) => {

      console.log(data)

      this.episodes = data["episodes"]
      this.animeData.latestEpisodes = this.episodes
      this.currentEpisodeState = this.states.loaded

    },()=>{
      this.currentEpisodeState = this.states.error

    })
  }

  getLatestAnimes() {
    this.animeService.getLatestAnimes().subscribe((data) => {
      console.log(data)
      this.animes = data["animes"]
      this.animeData.latestAnimes = this.animes
      this.currentAnimeState = this.states.loaded

    },()=>{
      this.currentEpisodeState = this.states.error

    })
  }

  scroll(element:HTMLElement,event){
    let scrollValue = element.scrollLeft
    let scrollAmount= event.deltaY <0 ? scrollValue+150: scrollValue-150
    element.scroll({left:scrollAmount})
  }

  ngOnInit(): void {
    
  }

}
