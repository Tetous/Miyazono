import { NavigationExtras, Router } from '@angular/router';
import { AnimeData } from './../../services/animeData.service';
import { AnimeService } from './../../services/anime.service';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPage implements OnInit {
  episodes = []
  animes = []
  servers = []
  episodesLoaded = false;
  animesLoaded = false;
  modal
  selectedEpisode
  selectedAnimeId
  selectedEpisodeId;
  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  serverState = this.states.loading
  currentEpisodeState = this.states.loading
  currentAnimeState = this.states.loading

  constructor(private animeService: AnimeService, private animeData: AnimeData, private router: Router) {
    animeData.data = null
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
        "animeId": anime.id,
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
    this.currentEpisodeState = this.states.loading

    this.animeService.getLatestEpisodes().subscribe((data) => {


      this.episodes = data["episodes"]
      for (let anime of this.episodes) {
        anime.poster = this.getCorrectImage(anime.poster)
      }
      this.animeData.latestEpisodes = this.episodes
      this.currentEpisodeState = this.animeData.latestEpisodes.length != 0 ? this.states.loaded : this.states.error

    }, () => {
      this.currentEpisodeState = this.states.error

    })
  }

  getLatestAnimes() {
    this.currentAnimeState = this.states.loading

    this.animeService.getLatestAnimes().subscribe((data) => {

      this.animes = data["animes"]
      for (let anime of this.animes) {
        anime.poster = this.getCorrectImage(anime.poster)
      }
      this.animeData.latestAnimes = this.animes
      this.currentAnimeState = this.animeData.latestAnimes.length != 0 ? this.states.loaded : this.states.error

    }, () => {
      this.currentAnimeState = this.states.error

    })
  }

  scroll(element: HTMLElement, event) {
    let scrollValue = element.scrollLeft
    let scrollAmount = event.deltaY < 0 ? scrollValue + 150 : scrollValue - 150
    element.scroll({ left: scrollAmount })
  }

  getAnimeId(episode) {
    var elems = document.querySelector('.modal');
    this.modal = M.Modal.init(elems);
    this.serverState = this.states.loading
    this.modal.open()

    this.selectedEpisode = episode;

    this.animeService.getSearchResult(episode.title).subscribe(results => {

      let current = 0
      while (results["search"][current].title != episode.title) {
        current++;
      }
      this.selectedAnimeId = results["search"][current].id
      let data = results["search"][current].episodes
      this.selectedEpisodeId = data[data.length - Number.parseInt(episode.episode)].id

      if (this.selectedEpisodeId == null) {
        this.serverState = this.states.error

        return
      }

      this.getServers(this.selectedEpisodeId)

    }, () => {
      this.serverState = this.states.error
    })
  }

  getCorrectImage(base64: string) {

    while (base64.length % 4 > 0) {
      base64 += '='
    }

    return base64
  }

  getServers(id) {
    this.animeService.getServers(id).subscribe(servers => {
      this.serverState = this.states.loaded

      this.servers = servers["servers"];
    }, () => {
      this.serverState = this.states.error
    })
  }


  watchOption(serverCode) {
    this.modal.close()
    let extras: NavigationExtras = {
      queryParams: {
        "serverCode": serverCode,
        "name": this.selectedEpisode.title,
        "id": this.selectedAnimeId

      }
    }
    this.router.navigate(["/watch"], extras)

  }


  ngAfterViewInit() {

  }

  ngOnInit(): void {

  }

}
