import { Component, Injectable, OnInit } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { EmailValidator } from '../shared/email.validator';
import { CanDeactivate, Router, RouteParams } from 'angular2/router';
import { UserService } from './user.service';
import { HTTP_PROVIDERS} from 'angular2/http'
import { User } from './user'

@Component({
    selector: 'add-user',
    templateUrl: 'app/users/add-user-form-component.html',
    providers: [HTTP_PROVIDERS, UserService]
})
export class AddUserFormComponent implements CanDeactivate, OnInit {

    signupForm: ControlGroup;
    id ;
    title : string ;
    user = new User();
    constructor(fb: FormBuilder, 
        private _userService: UserService, 
        private _routeParams : RouteParams,
        private _router: Router) {

        this.signupForm = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, EmailValidator.mailFormat])],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []

            })

        })

        
    }

    routerCanDeactivate(next, previous) {
        if (this.signupForm.dirty) {
            return confirm("Are you sure?");
        }

    }

    signUp() {
        
        var result;
        if(this.user.id) {
            result = this._userService.updateUser(this.user);
        } else {
           result = this._userService.addUser( this.user);
        }
        result.subscribe( result => {
                     console.log(result);
                     this._router.navigate(['Users'])
                });
    }

    ngOnInit() {
        this.id = this._routeParams.get("id");
        //  id = "10";
        this.title = this.id ? "Edit User" : "New User";

        if(!this.id) {
            return;
        }
        this._userService.getUser(this.id).subscribe( user => this.user = user, 
            response => {
                if(response.status == 404) {
                    this._router.navigate(['NotFound'])
                }
            });

    }

}