import { CreatedParams } from 'model/vpn-api';
import { SempConfig } from 'model/semp-api';
import { inject } from "aurelia-framework";
import { Router, RouteConfig } from "aurelia-router";

@inject(Router)
export class Created {
  private routeConfig: RouteConfig;
  private createdParams: CreatedParams;
  private solAdminMsgVpnsUrl: string;

  constructor(private router: Router){}
  
  /**
   * Framework method to fetch VPN details after viewmodel activates this object.
   * @see https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/
   * 
   * @param params Framework params object should be CreatedParams, populated by logic in review screen @see review.ts
   * @param routeConfig Framework routing configuration
   */
  activate(params: any, routeConfig: RouteConfig): void {
    this.routeConfig = routeConfig;
    this.createdParams = <CreatedParams>params;
    this.solAdminMsgVpnsUrl = this.createdParams.sempUrl + '/#/system-info/msg-vpns/msg-vpn-list';
    return;
  }

}
