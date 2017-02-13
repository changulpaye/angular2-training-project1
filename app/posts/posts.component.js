System.register(['angular2/core', 'angular2/http', './post.service', '../shared/spinner.component', '../users/user.service', '../shared/pagination.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, post_service_1, spinner_component_1, user_service_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postService, _userService) {
                    this._postService = _postService;
                    this._userService = _userService;
                    this.posts = [];
                    this.pagedPosts = [];
                    this.pageSize = 10;
                }
                PostsComponent.prototype.ngOnInit = function () {
                    this.loadUsers();
                    this.loadPosts();
                };
                PostsComponent.prototype.loadPosts = function (filter) {
                    var _this = this;
                    this.postLoading = true;
                    this._postService.getPosts(filter)
                        .subscribe(function (posts) {
                        _this.posts = posts;
                        _this.pagedPosts = _.take(_this.posts, _this.pageSize);
                    }, null, function () { _this.postLoading = false; });
                };
                PostsComponent.prototype.loadUsers = function () {
                    var _this = this;
                    this._userService.getUsers()
                        .subscribe(function (users) { return _this.users = users; });
                };
                PostsComponent.prototype.showPostDetail = function (post) {
                    this.currentPost = post;
                    this.getComments(post.id);
                };
                PostsComponent.prototype.getComments = function (id) {
                    var _this = this;
                    this.commentLoading = true;
                    this.comments = null;
                    this._postService.getComments(id)
                        .subscribe(function (comments) { return _this.comments = comments; }, null, function () { return _this.commentLoading = false; });
                };
                PostsComponent.prototype.reloadPosts = function (filter) {
                    this.postLoading = true;
                    this.loadPosts(filter);
                };
                PostsComponent.prototype.onPageChanged = function (page) {
                    var startingIndex = (page - 1) * this.pageSize;
                    this.pagedPosts = _.take(_.rest(this.posts, startingIndex), this.pageSize);
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        selector: 'posts',
                        templateUrl: 'app/posts/post.component.html',
                        providers: [http_1.HTTP_PROVIDERS, post_service_1.PostService, user_service_1.UserService],
                        directives: [spinner_component_1.SpinnerComponent, pagination_component_1.PaginationComponent],
                        styleUrls: ['app/posts/post.style.css']
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, user_service_1.UserService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map