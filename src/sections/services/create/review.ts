import { inject, bindable } from "aurelia-framework";
import { Router, RouteConfig } from "aurelia-router";
import { createVpnJson, CreatedParams, ErrorParams } from "model/vpn-api";
import { SempApi,SempConfig, isValidSempConfig } from "model/semp-api";

@inject(Router)
export class Review {
  private routeConfig: RouteConfig;
  private sempJson: string;
  private systemSempConfigs: Array<SempConfig>;
  private customSempConfig: SempConfig;
  @bindable
  private selectedSempConfig: number = -1;

  constructor(private router: Router){
    this.sempJson = '';
    // TODO: load this from our service providing all available brokers and append 'CUSTOM' as the last entry
    this.systemSempConfigs = [
      {
        id: 1,
        url: 'http://192.168.56.104:8080',
        adminUser: 'admin',
        adminPassword: 'admin'
      },
      {
        id: 2,
        url: 'http://192.168.56.200:8080',
        adminUser: 'admin',
        adminPassword: 'admin'
      },
      { 
        id: 3, 
        url: 'CUSTOM', 
        adminUser: '', 
        adminPassword: ''
      }
    ];
    this.customSempConfig = { id: 3, url: '', adminUser: 'admin', adminPassword: 'admin' }
  }
  
  /**
   * Framework method to fetch VPN details after viewmodel activates this object.
   * @see https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/
   * 
   * @param params Framework params object should be ReviewParams, populated by logic in customize screen @see customize.ts
   * @param routeConfig Framework routing configuration
   */
  activate(params: any, routeConfig: RouteConfig): void {
    this.routeConfig = routeConfig;
    // Turn the plan into a SEMP message
    this.sempJson = JSON.stringify(createVpnJson(params.plan), null, 2);
    return;
  }

  /**
   * This is a bit odd due to HTML/TS split: the HTML adds a null 'CHOOSE...' item in the select list, 
   * and our code-behind as added 'CUSTOM' as the last entry in this array. So the select list has one 
   * more item this our systemSempConfigs has.
   */
  chooseSempConfig(): SempConfig {
    var selection: SempConfig = null;
    // Due to the extra select member, 'length' always points to 'CUSTOM'
    if (this.selectedSempConfig == this.systemSempConfigs.length) {
      selection = this.customSempConfig;
    }
    else if (this.selectedSempConfig > 0 && this.selectedSempConfig < this.systemSempConfigs.length) {
      selection = this.systemSempConfigs[this.selectedSempConfig-1];
    }
    return selection;
  }

  /**
   * Routes the genererated CreatedParams object to the 'created' screen.
   */
  next(): void {
    let usedConfig = this.chooseSempConfig();
    if (!isValidSempConfig(usedConfig)) {
      console.log('REVIEW.NEXT FAILED: NO VALID SEMP-CONFIG SELECTED. DIAGNOSTIC INFO:');
      console.log('selectedSempConfig => ' + this.selectedSempConfig);
      console.log('systemSempConfigs.length => ' + this.systemSempConfigs.length);
      console.log('usedConfig => ' + JSON.stringify(usedConfig));
      // TODO: alert user
      return;
    }
    this.routeConfig.navModel.setTitle('SUBMITTING SEMP...');
    let api = new SempApi();
    // Send SEMP request and gather response.
    api.createVpn(usedConfig, this.sempJson)
      .then(response => {
        this.router.navigateToRoute('services/create/created', 
        <CreatedParams>{
          sempUrl: usedConfig.url,
          sempRequest: this.sempJson,
          sempResponse: JSON.stringify(response, null, 2)
        });
      })
      .catch(error => {
        console.log('Error creating msg-VPN! '+ JSON.stringify(error));
        this.router.navigateToRoute('services/create/error', 
        <ErrorParams>{
          sempUrl: usedConfig.url,
          sempError: JSON.stringify(error, null, 2)
        });
      });
  }
}
