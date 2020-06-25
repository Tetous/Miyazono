import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimeService {

    constructor(private http: HttpClient) {

    }

    getLatestEpisodes() {

        return this.getFromRest("LatestEpisodesAdded")
    }

    getAnimeServers(id) {
        return this.getFromRest("GetAnimeServers", id)

    }

    getLatestAnimes() {
        return this.getFromRest("LatestAnimeAdded")
    }

    getSearchResult(name) {
        return this.getFromRest("Search", name)
    }

    getAnimeInfo(id, title) {
        return this.getFromRest("GetAnimeInfo", id + "/" + title)
    }

    getServers(id) {
        return this.getFromRest("GetAnimeServers", id)

    }

    getMovies(sortBy, page) {
        return this.getFromRest("Movies", sortBy + "/" + page);
    }
    getOva(sortBy, page) {
        return this.getFromRest("Ova", sortBy + "/" + page);
    }
    getTv(sortBy, page) {
        return this.getFromRest("Tv", sortBy + "/" + page);
    }
    getSpecial(sortBy, page) {
        return this.getFromRest("Special", sortBy + "/" + page);
    }

    getFromRest(url, extra?) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
        let fullUrl = extra != undefined ? `https://miyazonorest.herokuapp.com/api/v1/${url}/${extra}` : `https://miyazonorest.herokuapp.com/api/v1/${url}`

        return this.http.get(fullUrl, { headers });


    }
}