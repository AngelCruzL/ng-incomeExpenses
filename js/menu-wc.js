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
                    <a href="index.html" data-type="index-link">income-expenses documentation</a>
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
                                            'data-bs-target="#components-links-module-AppModule-ae4327acefb60f05b90e5f534644866ed1175bf429af1507b35b63235a7e08a64430d079ac1e34b97ba77866219f22278e3c4fc347e31a14d1f7ac252c5438b6"' : 'data-bs-target="#xs-components-links-module-AppModule-ae4327acefb60f05b90e5f534644866ed1175bf429af1507b35b63235a7e08a64430d079ac1e34b97ba77866219f22278e3c4fc347e31a14d1f7ac252c5438b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ae4327acefb60f05b90e5f534644866ed1175bf429af1507b35b63235a7e08a64430d079ac1e34b97ba77866219f22278e3c4fc347e31a14d1f7ac252c5438b6"' :
                                            'id="xs-components-links-module-AppModule-ae4327acefb60f05b90e5f534644866ed1175bf429af1507b35b63235a7e08a64430d079ac1e34b97ba77866219f22278e3c4fc347e31a14d1f7ac252c5438b6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-7e386ca8c282fc453f48d7770f79d37620c60140bfd4515283ad3cd73d29f2688eaec6e77087a913d96c9fd291101270b93eb356d9299c82a93aeafcac952e7b"' : 'data-bs-target="#xs-components-links-module-AuthModule-7e386ca8c282fc453f48d7770f79d37620c60140bfd4515283ad3cd73d29f2688eaec6e77087a913d96c9fd291101270b93eb356d9299c82a93aeafcac952e7b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-7e386ca8c282fc453f48d7770f79d37620c60140bfd4515283ad3cd73d29f2688eaec6e77087a913d96c9fd291101270b93eb356d9299c82a93aeafcac952e7b"' :
                                            'id="xs-components-links-module-AuthModule-7e386ca8c282fc453f48d7770f79d37620c60140bfd4515283ad3cd73d29f2688eaec6e77087a913d96c9fd291101270b93eb356d9299c82a93aeafcac952e7b"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' : 'data-bs-target="#xs-components-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' :
                                            'id="xs-components-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IncomeExpensesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncomeExpensesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' : 'data-bs-target="#xs-pipes-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' :
                                            'id="xs-pipes-links-module-DashboardModule-914e4961f32852bd6c0d1cca6b7586001714a37f28b3498e11f27f8760b84294064adff2c3ffa2517e6ed5d5295088edfb55fdf8e36ab17729910b85395de9e4"' }>
                                            <li class="link">
                                                <a href="pipes/IncomeExpensePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncomeExpensePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortIncomeExpensesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortIncomeExpensesPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-0f9a045e27fdb007fea1e6b5b8582e91e861cd6b89da14d13cbb25810c9abd8b581d1cdd37bd1208eb6c6521c9a9be9607e4ce82d3f0e7d3cad2efa8c0f1fe40"' : 'data-bs-target="#xs-components-links-module-SharedModule-0f9a045e27fdb007fea1e6b5b8582e91e861cd6b89da14d13cbb25810c9abd8b581d1cdd37bd1208eb6c6521c9a9be9607e4ce82d3f0e7d3cad2efa8c0f1fe40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-0f9a045e27fdb007fea1e6b5b8582e91e861cd6b89da14d13cbb25810c9abd8b581d1cdd37bd1208eb6c6521c9a9be9607e4ce82d3f0e7d3cad2efa8c0f1fe40"' :
                                            'id="xs-components-links-module-SharedModule-0f9a045e27fdb007fea1e6b5b8582e91e861cd6b89da14d13cbb25810c9abd8b581d1cdd37bd1208eb6c6521c9a9be9607e4ce82d3f0e7d3cad2efa8c0f1fe40"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/IncomeExpenses.html" data-type="entity-link" >IncomeExpenses</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IncomeExpenseService.html" data-type="entity-link" >IncomeExpenseService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppStateWithIncomeExpense.html" data-type="entity-link" >AppStateWithIncomeExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link" >State</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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