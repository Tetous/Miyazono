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
    empty: 2,
    error: 3

  }
  search
  currentState = this.states.loading
  constructor(private animeService: AnimeService, private route: ActivatedRoute, private router: Router, private animeData: AnimeData) { }
  scroll(element: HTMLElement, event) {
    event.preventDefault()
    let scrollValue = element.scrollLeft
    let scrollAmount = event.deltaY < 0 ? scrollValue + 150 : scrollValue - 150
    element.scroll({ left: scrollAmount })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.search = params.search

      if (this.animeData.searchData != null && this.search == this.animeData.searchQuery) {
        
        if(this.animeData.searchData.length == 0){
          this.currentState = this.states.empty
          return;
        }
        
        this.searchResults = this.animeData.searchData

        this.currentState = this.states.loaded
      } else {
        this.searchAnime()
      }
    })
  }

  searchAnime() {
    this.currentState = this.states.loading
    this.animeService.getSearchResult(this.search).subscribe(results => {

      this.searchResults = []


      this.searchResults = results["search"]

      if (this.searchResults == null)
        this.searchResults = []

      this.animeData.searchQuery = this.search;
      this.animeData.searchData = this.searchResults;

      if (this.searchResults.length == 0) {
        this.currentState = this.states.empty
      } else {
        this.currentState = this.states.loaded

      }

    },()=>{
      this.currentState = this.states.error
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
