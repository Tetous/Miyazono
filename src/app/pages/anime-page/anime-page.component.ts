import { AnimeService } from './../../services/anime.service';
import { AnimeData } from './../../services/animeData.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import * as M from 'materialize-css';

@Component({
  selector: 'anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePage implements OnInit {

  animeInfo = {
    id: "",
    title: "",
    poster: "",
    episodes: [],
    synopsis: ""
  };

  servers = []
  modal
  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  serverState = this.states.loading
  currentState = this.states.loading
  constructor(private animeData: AnimeData, private animeService: AnimeService, private route: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
    if (animeData.data == undefined) {
      this.getEpisodes();
    } else {
      this.animeInfo = animeData.data
      if (animeData.data.synopsis.substring(0,5) == 'Anime') {
        this.animeInfo.synopsis = this.animeInfo.synopsis.substring(9)
      } else if (animeData.data.synopsis.substring(0,8) == 'Película') {
        this.animeInfo.synopsis = this.animeInfo.synopsis.substring(12)
      }

      this.currentState = this.states.loaded


    }
  }

  getEpisodes() {
    this.currentState = this.states.loading
    this.route.queryParams.subscribe(params => {
      let animeName = params.animeName
      let id = params.animeId
      this.animeService.getSearchResult(animeName).subscribe(results => {
        let current = 0
        while (results["search"][current].id != id) {
          current++;
        }
        let data = results["search"][current]
        this.animeInfo = data
        if (this.animeInfo.synopsis.substring(0,5) == 'Anime') {
          this.animeInfo.synopsis = this.animeInfo.synopsis.substring(9)
        } else if (this.animeInfo.synopsis.substring(0,8) == 'Película') {
          this.animeInfo.synopsis = this.animeInfo.synopsis.substring(12)
        }
        if (this.animeInfo.episodes == null)
          this.animeInfo.episodes = []
        this.currentState = this.animeInfo.episodes.length != null ? this.states.loaded : this.states.error

      }, () => {
        this.currentState = this.states.error
      })

    })
  }



  watchOption(serverCode) {

    let extras: NavigationExtras = {
      queryParams: {
        "serverCode": serverCode,
        "name": this.animeInfo.title,
        "id": this.animeInfo.id

      }
    }
    this.router.navigate(["/watch"], extras)

  }

  getServers(id) {
    var elems = document.querySelector('.modal');
    this.modal = M.Modal.init(elems);
    this.modal.open()

    this.animeService.getServers(id).subscribe(servers => {
      this.serverState = this.states.loaded
      this.servers = servers["servers"];
    }, () => {
      this.serverState = this.states.error
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    var elems = document.querySelector('.modal');
    this.modal = M.Modal.init(elems);
  }

  ngOnInit(): void {
  }

}
