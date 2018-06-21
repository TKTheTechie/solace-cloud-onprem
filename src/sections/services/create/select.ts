import { inject } from "aurelia-framework";
import { Router, RouteConfig } from "aurelia-router";
import { AuthType, CustomizeParams, VpnPlan } from '../../../model/vpn-api';

@inject(Router)
export class Create {

  private routeConfig: RouteConfig;
  private selectedPlanName: string;
  private approverEmail: string;

  plan_templates: Array<VpnPlan>;
 
  constructor(private router: Router){
    this.plan_templates=[
      {name:'Basic',maxConnections:10,maxSpool:100,
      defaultMaxConnections:10,defaultMaxSpool:100,
      authType:AuthType.Internal,authProfile:''},
      {name:'Intermediate', maxConnections: 100, maxSpool:500,
      defaultMaxConnections:100,defaultMaxSpool:500,
      authType:AuthType.Internal,authProfile:''},
      {name:'Advanced',maxConnections:1000, maxSpool:1000,
      defaultMaxConnections:1000,defaultMaxSpool:1000,
      authType:AuthType.Internal,authProfile:''}
    ];
  }

    /**
   * Framework method to fetch VPN details after viewmodel activates this object.
   * @see https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/
   * 
   * @param params Framework params object not used, populated by logic in route-ref in @see management.ts
   * @param routeConfig Framework routing configuration
   */
  activate(params: any, routeConfig: RouteConfig): void {
    this.routeConfig = routeConfig;
    return;
  }

  selectPlan(planName: string): void {
    this.selectedPlanName = planName;
  }

  /**
   * Collects plan selection and routes CustomizeParams to the router-view to the 'customize' screen.
   */
  next(): void {
    this.routeConfig.navModel.setTitle(this.selectedPlanName);
    let selectedPlan = this.plan_templates.find(x => x.name==this.selectedPlanName);
    // Routes a CustomizeParams object; @see vpn-api.ts
    this.router.navigateToRoute('services/create/customize', 
      <CustomizeParams>{ 
        plan: selectedPlan, 
        approverEmail: this.approverEmail 
      });
  }
  

}   
