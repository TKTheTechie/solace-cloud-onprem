import {RouterConfiguration, Router} from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Login {    
  router: Router;

  constructor(router: Router){
    this.router=router;
  }
  
  login(): void{
    this.router.navigate('management');
  }
}
