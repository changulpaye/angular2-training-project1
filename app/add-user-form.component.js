System.register(['angular2/core', 'angular2/common', './email.validator', 'angular2/router', './user.service', 'angular2/http', './user'], function(exports_1, context_1) {
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
    var core_1, common_1, email_validator_1, router_1, user_service_1, http_1, user_1;
    var AddUserFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (email_validator_1_1) {
                email_validator_1 = email_validator_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            AddUserFormComponent = (function () {
                function AddUserFormComponent(fb, _userService, _routeParams, _router) {
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.user = new user_1.User();
                    this.signupForm = fb.group({
                        name: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([common_1.Validators.required, email_validator_1.EmailValidator.mailFormat])],
                        phone: [],
                        address: fb.group({
                            street: [],
                            suite: [],
                            city: [],
                            zipcode: []
                        })
                    });
                }
                AddUserFormComponent.prototype.routerCanDeactivate = function (next, previous) {
                    if (this.signupForm.dirty) {
                        return confirm("Are you sure?");
                    }
                };
                AddUserFormComponent.prototype.signUp = function () {
                    var _this = this;
                    var result;
                    if (this.user.id) {
                        result = this._userService.updateUser(this.user);
                    }
                    else {
                        result = this._userService.addUser(this.user);
                    }
                    result.subscribe(function (result) {
                        console.log(result);
                        _this._router.navigate(['Users']);
                    });
                };
                AddUserFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.id = this._routeParams.get("id");
                    //  id = "10";
                    this.title = this.id ? "Edit User" : "New User";
                    if (!this.id) {
                        return;
                    }
                    this._userService.getUser(this.id).subscribe(function (user) { return _this.user = user; }, function (response) {
                        if (response.status == 404) {
                            _this._router.navigate(['NotFound']);
                        }
                    });
                };
                AddUserFormComponent = __decorate([
                    core_1.Component({
                        selector: 'add-user',
                        templateUrl: 'app/add-user-form-component.html',
                        providers: [http_1.HTTP_PROVIDERS, user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService, router_1.RouteParams, router_1.Router])
                ], AddUserFormComponent);
                return AddUserFormComponent;
            }());
            exports_1("AddUserFormComponent", AddUserFormComponent);
        }
    }
});
//# sourceMappingURL=add-user-form.component.js.map