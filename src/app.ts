import {RouterConfiguration, Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router=router;
    config.map([
      { route: '', redirect: 'login' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('login'), nav: true, title: 'Solace Cloud' },
      { route: 'management', name: 'management', moduleId: PLATFORM.moduleName('management'), nav: true, title: 'Management' }
    ]);

  }
}
