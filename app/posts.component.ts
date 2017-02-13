import { Component, OnInit } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { PostService } from './post.service';
import { Posts } from './posts';
import { SpinnerComponent } from './spinner.component';
import { Comments } from './comments';
import { UserService } from './user.service';
import { User } from './user';
import { PaginationComponent } from './pagination.component';

@Component({
    selector: 'posts',
    templateUrl: 'app/post.component.html',
    providers: [HTTP_PROVIDERS, PostService, UserService],
    directives: [SpinnerComponent, PaginationComponent],
    styleUrls: ['app/posts.style.css']
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
                this.pagedPosts = this.getPostInPage(1);
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
        this.pagedPosts = this.getPostInPage(page);
    }

    getPostInPage(page) {
        var result = [];
        var startingIndex = (page - 1) * this.pageSize;
        var endingIndex = Math.min(startingIndex + this.pageSize, this.posts.length);

        for(var i = startingIndex; i <  endingIndex; i++) {
            result.push(this.posts[i]);
        }
        return result;

    }



}
