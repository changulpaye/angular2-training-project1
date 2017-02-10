import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {User} from './user';

@Injectable()
export class UserService {
    private _url = "https://jsonplaceholder.typicode.com/users";

    constructor(private _http : Http) {

    }

    getUsers() {
        return this._http.get(this._url)
            .map(res => res.json());
    }

    addUser(json) {
        console.log(JSON.stringify(json));
        return this._http.post(this._url, JSON.stringify(json))
            .map(res => res.json());
    }

    getUser(id) {
        return this._http.get(this._url +"/"+ id)
            .map(res => res.json());

    }
    updateUser(json : User) {
        return this._http.put(this._url + "/" + json.id, JSON.stringify(json))
            .map(res => res.json());
    }

    deleteUser(user : User) {
        return this._http.delete(this._url + "/" + user.id)
            .map(res => res.json());
    }
}