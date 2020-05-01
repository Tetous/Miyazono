import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(e){
    if(e != ""){
      let extras: NavigationExtras = {
        queryParams: {
          "search":e
  
        }
      }
      this.router.navigate(["/search"], extras)

    }
  }
}
