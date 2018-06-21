import {Router,RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class Management {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router=router;
    config.map([
      { route: '', redirect: 'services' },
      { route: 'services', name: 'services', moduleId:  PLATFORM.moduleName('sections/services/services'), nav: true, title: 'Services' },
      { route: 'services/create/select', name: 'services/create/select', moduleId:  PLATFORM.moduleName('sections/services/create/select'), nav: false, title: 'Customize Service Plan' },
      { route: 'services/create/customize', name: 'services/create/customize', moduleId:  PLATFORM.moduleName('sections/services/create/customize'), nav: false, title: 'Customize Service Plan' },
      { route: 'services/create/review', name: 'services/create/review', moduleId:  PLATFORM.moduleName('sections/services/create/review'), nav: false, title: 'Review Service Plan' },
      { route: 'services/create/created', name: 'services/create/created', moduleId:  PLATFORM.moduleName('sections/services/create/created'), nav: false, title: 'Service Created' },
      { route: 'services/create/error', name: 'services/create/error', moduleId:  PLATFORM.moduleName('sections/services/create/error'), nav: false, title: 'Service Creation Error' },
      { route: 'support', name: 'support', moduleId: 'support', nav: true, title: 'Support' },
      { route: 'resources', name: 'resources', moduleId: 'resources', nav: true, title: 'Resources' }
    ]);

  }
}
