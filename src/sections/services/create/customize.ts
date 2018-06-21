import { inject } from "aurelia-framework";
import { Router, RouteConfig } from "aurelia-router";
import { VpnPlan, ReviewParams } from "model/vpn-api";

@inject(Router)
export class Customize {
  private routeConfig: RouteConfig;
  private plan: VpnPlan;
  private approverEmail: string;

  constructor(private router: Router){}

  /**
   * Framework method to fetch VPN details after viewmodel activates this object.
   * @see https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/
   * 
   * @param params Framework params object should be a CustomizeParams, populated by logic in route-ref in @see create.ts
   * @param routeConfig Framework routing configuration
   */
  activate(params: any, routeConfig: RouteConfig): void {
    this.routeConfig = routeConfig;
    this.plan = <VpnPlan>params.plan;
    this.approverEmail = params.approverEmail;
    return;
  }

  /**
   * Collects user-customizations to the plan and routes ReviewParams to the 'review' screen.
   */
  next(): void {
    this.routeConfig.navModel.setTitle(this.plan.name);
    // Routes a ReviewParams object; @see vpn-api.ts
    this.router.navigateToRoute('services/create/review', 
      <ReviewParams>{ 
        plan: this.plan
      });
  }
}
