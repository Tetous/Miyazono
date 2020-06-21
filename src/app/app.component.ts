import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miyazono';
  watchPage = false;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let route = val.url.split("?").shift();
        if (route == '/watch') {
          this.watchPage = true
        } else {
          this.watchPage = false
        }

      }

    })
  }
}
