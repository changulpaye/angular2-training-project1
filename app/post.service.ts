import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Posts } from './posts';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class PostService {

    private _url = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) {

    }

    getPosts(filter?) {
        var url = this._url;
        console.log(filter)
        if(filter && filter.userId) 
            url += "?userId=" + filter.userId;

        return this._http.get(url)
            .map(result => result.json());
    }

    getComments(id: number) {
        return this._http.get(this._url + "/" + id + "/comments")
            .map(result => result.json());
    }

    getCurrentUserPosts(id : number) {
        return this._http.get(this._url + "?userId=" + id +"")
            .map(result => result.json());
    }


}