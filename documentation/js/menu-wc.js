'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' : 'data-bs-target="#xs-controllers-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' :
                                            'id="xs-controllers-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' : 'data-bs-target="#xs-injectables-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' :
                                        'id="xs-injectables-links-module-AppModule-991002f9a20b4bc4f28a7fb8d7a0f6d7e30cb691b1e32d9725b88a112bc89bbef22014094ebf1c2afb7886448ebd529131e9ef6d7fc29dfd35c9f8e022b2a052"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' :
                                            'id="xs-controllers-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' :
                                        'id="xs-injectables-links-module-AuthModule-b5260f8918e1ccf9532e0e058dc7635072a72617b31202e243f267dfa9ba5f9ce215f6f895d90c731af0219a5bc1af875a1a7abd71398d6f68d9d5e850d0b876"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' :
                                            'id="xs-controllers-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' :
                                        'id="xs-injectables-links-module-PostsModule-f98b061eb966e5b7672b8aa457cf752f8fcc9f181c20cd24d78a9dfcc35e111cab698a9010d1477bfbb1e2750055069e2be268ab2e61395838c6071cd19c8a62"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' :
                                            'id="xs-controllers-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' :
                                        'id="xs-injectables-links-module-UsersModule-53d1c64598b09f52dbf9fee7d7f38d2181c185422fb81f4b90847dc53fe8fe6ff053779c1f9e8e14844032816623a236fb048f9b0b2731563106cdf3f9b4d53a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});