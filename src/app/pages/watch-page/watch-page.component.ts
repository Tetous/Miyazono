import { AnimeService } from './../../services/anime.service';
import { AnimeData } from './../../services/animeData.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.css']
})
export class WatchPage implements OnInit {

  episode = {
    animeId: "",
    title: "",
    number: "",
    otherEpisodes: [],
    servers: []
  }

  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentEpisode;
  currentState = this.states.loading
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");


  constructor(private animeData: AnimeData, private animeService: AnimeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {
    console.log("changing")
    if (animeData.episodeData != null) {

    }
    route.queryParams.subscribe(params => {
      console.log(params)

      let id = params.episodeId

      this.episode.title = params.episodeTitle
      this.episode.number = params.episodeNumber
      this.currentEpisode = this.episode.number
      this.getEpisodes();


    })

  }

  getEpisodes() {
    this.currentState = this.states.loading
    console.log("getting results")

    this.animeService.getSearchResult(this.episode.title).subscribe(results => {
      console.log(results)

      let current = 0
      while (results["search"][current].title != this.episode.title) {
        current++;
      }
      let data = results["search"][current].episodes
      this.episode.otherEpisodes = data
      let id = this.episode.otherEpisodes[this.episode.otherEpisodes.length - Number.parseInt(this.episode.number)].id
      this.currentState = this.states.loaded
      this.animeService.getServers(id).subscribe(servers => {
        this.episode.servers = servers["servers"];
        this.changeUrl(this.episode.servers[0].code)
      })

    }, () => {
      this.currentState = this.states.error
    })
  }



  changeUrl(url) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  changeEpisodePage(episode) {
    this.currentState = this.states.loading
    this.currentEpisode = episode.episode
    this.animeData.episodeData = undefined;
    let extras: NavigationExtras = {
      queryParams: {
        "episodeId": episode.id,
        "animeId": this.episode.animeId,
        "episodeTitle": this.episode.title,
        "episodeNumber": episode.episode,

      }
    }
    this.router.navigate(["/watch"], extras)


  }
  scroll(element: HTMLElement, event) {
    let scrollValue = element.scrollLeft
    let scrollAmount = event.deltaY < 0 ? scrollValue + 150 : scrollValue - 150
    element.scroll({ left: scrollAmount })
  }
  is_numeric(str) {
    return /^\d+$/.test(str);
  }
  ngOnInit(): void {

  }


}
