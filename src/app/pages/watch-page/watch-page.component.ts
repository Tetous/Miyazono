
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

  serverCode;
  animeName
  animeId

  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentEpisode;
  currentState = this.states.loading
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");


  constructor(private animeData: AnimeData, private animeService: AnimeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {
    if (animeData.episodeData != null) {

    }
    route.queryParams.subscribe(params => {
      this.animeName = params.name
      this.animeId = params.id
      this.serverCode = params.serverCode

      this.changeUrl(this.serverCode)


    })

  }



  return() {
    let extras: NavigationExtras = {
      queryParams: {
        "animeName": this.animeName,
        "animeId": this.animeId
      }
    }
    this.router.navigate(["/anime"], extras)
  }

  changeUrl(url) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  ngOnInit(): void {

  }


}
