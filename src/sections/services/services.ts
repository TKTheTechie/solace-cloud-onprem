import {RouterConfiguration, Router} from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Services {    
  router: Router;
  services: Array<{name: string, icon: string, application_name: string, device_name:string}>;

  constructor(router: Router) {
    this.services = [{name:'VPN1',icon:'blur_on',application_name:'My 1st Solace App',device_name:'vmr1.solace.com'}];
    console.log(this.services);
    this.router = router;
  }

  createService(){
    this.router.navigate('services/create');
  }
 
}
