import { AnimeData } from './../../services/animeData.service';
import { AnimeService } from './../../services/anime.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPage implements OnInit {
  searchResults = [];
  states = {
    loading: 0,
    loaded: 1,
    error: 2

  }
  currentState = this.states.loading
  constructor(private animeService: AnimeService, private route: ActivatedRoute, private router: Router, private animeData: AnimeData) {



  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentState = this.states.loading
      let search = params.search
      this.animeService.getSearchResult(search).subscribe(results => {
        this.searchResults = []
        this.searchResults = results["search"]
        this.currentState = this.searchResults.length != 0 ? this.states.loaded : this.states.error
      })
    })
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

}
