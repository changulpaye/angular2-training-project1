import { Component, OnInit } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { PostService } from './post.service';
import { Posts } from './posts';
import { SpinnerComponent } from '../shared/spinner.component';
import { Comments } from './comments';
import { UserService } from '../users/user.service';
import { User } from '../users/user';
import { PaginationComponent } from '../shared/pagination.component';

@Component({
    selector: 'posts',
    templateUrl: 'app/posts/post.component.html',
    providers: [HTTP_PROVIDERS, PostService, UserService],
    directives: [SpinnerComponent, PaginationComponent],
    styleUrls: ['app/posts/post.style.css']
})
export class PostsComponent implements OnInit {

    posts = [];
    pagedPosts = [];
    comments: Comments[];
    postLoading;
    commentLoading;
    users: User[];
    currentPost: Posts;
    pageSize = 10;

    constructor(
        private _postService: PostService,
        private _userService: UserService) {

    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    private loadPosts(filter?) {
        this.postLoading = true;
        this._postService.getPosts(filter)
            .subscribe(
            posts => {
                this.posts = posts;
                this.pagedPosts = _.take(this.posts, this.pageSize);
            },
            null,
            () => { this.postLoading = false });
    }

    private loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    showPostDetail(post: Posts) {
        this.currentPost = post;
        this.getComments(post.id);
    }

    getComments(id: number) {
        this.commentLoading = true;
        this.comments = null;
        this._postService.getComments(id)
            .subscribe(comments => this.comments = comments,
            null,
            () => this.commentLoading = false);
    }

    reloadPosts(filter) {
        this.postLoading = true;
        this.loadPosts(filter);
    }

    onPageChanged(page) {
        var startingIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startingIndex), this.pageSize);
    }
}
