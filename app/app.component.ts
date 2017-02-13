import { Component } from 'angular2/core';
import { NavBarComponent } from './navbar.component';
import { HomeComponent } from './home.coponent';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { AddUserFormComponent} from './users/add-user-form.component';
import { NotFoundComponent} from './not-found.component';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/posts', name: 'Posts', component: PostsComponent },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:id', name:"EditUser", component : AddUserFormComponent},
    { path: '/users/new', name:"AddUser", component : AddUserFormComponent},
    { path: '/notfound', name : 'NotFound', component : NotFoundComponent},
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }

])
@Component({
    selector: 'my-app',
    template: `<navbar></navbar>
               <div class="container">
                    <router-outlet></router-outlet>
               </div>`,
    directives: [NavBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
}