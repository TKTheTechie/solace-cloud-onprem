import {Router,RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class Management {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router=router;
    config.map([
      { route: '', redirect: 'services' },
      { route: 'services', name: 'services', moduleId:  PLATFORM.moduleName('services'), nav: true, title: 'Services' },
      { route: 'support', name: 'support', moduleId: 'support', nav: true, title: 'Support' },
      { route: 'resources', name: 'resources', moduleId: 'resources', nav: true, title: 'Resources' }
    ]);

  }
}
