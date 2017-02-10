import { Component, OnInit } from 'angular2/core';
import { UserService} from './user.service';
import { HTTP_PROVIDERS} from 'angular2/http';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { User} from './user'

@Component({
    selector: 'users',
    templateUrl : 'app/users.component.html',
    providers : [HTTP_PROVIDERS, UserService],
    directives : [ROUTER_DIRECTIVES]
})
export class UsersComponent implements OnInit {
    users : any[];
    constructor(private _userService : UserService) {

    }
    ngOnInit() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    deleteUser(user : User) {
       var isUserDelete = confirm("Are you sure you want to delete " + user.name + "?");
       if(isUserDelete) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this._userService.deleteUser(user)
                .subscribe(null, error => {
                    alert("Could not delete the user");
                    console.log(JSON.stringify(error));
                    this.users.splice(index, 0, user);
            });
       }
       
    }

 }
