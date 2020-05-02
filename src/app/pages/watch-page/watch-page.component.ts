import { AnimeService } from './../../services/anime.service';
import { AnimeData } from './../../services/animeData.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.css']
})
export class WatchPage implements OnInit {

  episode = {
    animeId:"",
    title: "",
    number: "",
    otherEpisodes:[],
    servers: []
  }
 
  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentState = this.states.loading
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");


  constructor(private animeData: AnimeData, private animeService: AnimeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router:Router) {

    if (animeData.episodeData == undefined) {
      route.queryParams.subscribe(params => {
        let id = params.episodeId
        animeService.getServers(id).subscribe(servers => {
          this.episode.servers = servers["servers"];
          this.episode.title = params.episodeTitle
          this.episode.number = params.episodeNumber
          this.episode.animeId = params.animeId
          this.getEpisodes();
          this.changeUrl(this.episode.servers[0].code)


        })
      })

    } else {
      this.episode = animeData.episodeData
    
      this.changeUrl(this.episode.servers[0].code)
    }


  }

  getEpisodes(){
    this.currentState = this.states.loading
    this.animeService.getSearchResult(this.episode.title).subscribe(results => {
      let current = 0
      while (results["search"][current].id != this.episode.animeId) {
        current++;
      }
      let data = results["search"][current].episodes
      this.episode.otherEpisodes = data
      this.currentState = this.states.loaded

    }, () => {
      this.currentState = this.states.error
    })
  }

  changeUrl(url){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    
  }
  changeEpisodePage(episode) {
    this.animeService.getAnimeServers(episode.id).subscribe(server => {
      this.animeData.episodeData = {
        title: this.episode.title,
        id:this.episode.animeId,
        otherEpisodes:this.episode.otherEpisodes,
        number: episode.episode,
        servers: server["servers"]
      }
      let extras: NavigationExtras = {
        queryParams: {
          "episodeId": episode.id,
          "animeId":this.episode.animeId,
          "episodeTitle": this.episode.title,
          "episodeNumber": episode.episode,

        }
      }
      this.router.navigate(["/watch"], extras)
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
