
/**
 * VPN-API Types
 */
export enum AuthType {
  None = 1,
  Internal,
  LDAP
}

export interface VpnPlan {
  name: string,
  maxSpool: number,
  defaultMaxSpool: number,
  maxConnections: number,
  defaultMaxConnections: number,
  authType: AuthType,
  authProfile: string
}

export interface CustomizeParams {
  plan: VpnPlan,
  approverEmail: string
}

export interface ReviewParams {
  plan: VpnPlan
}

export interface CreatedParams {
  sempUrl: string,
  sempRequest: string,
  sempResponse: string
}

export interface ErrorParams {
  sempUrl: string,
  sempError: string
}

export function toInteger(val: any, defaultVal: any) {
  if (typeof(val) == 'number') {
    return val;
  }
  let intVal = parseInt(val);
  if (!isNaN(intVal)) {
    return intVal;
  }
  return parseInt(defaultVal);
}

/**
* Converts a Vpn instance with config details into a SEMPv2-compliant 
* JSON payload object.
* 
* @param plan Vpn instance to be converted to SEMP JSON.
*/
export function createVpnJson(plan: VpnPlan): object {
 let semp = {
   msgVpnName: plan.name,
   maxMsgSpoolUsage: toInteger(plan.maxSpool, plan.defaultMaxSpool),
   maxConnectionCount: toInteger(plan.maxConnections, plan.defaultMaxConnections),
   maxTransactionCount: toInteger(plan.maxConnections, plan.defaultMaxConnections),
   authenticationBasicEnabled: true,
   authenticationBasicType: 'none',
   jndiEnabled: true,
   enabled: true
 };
 if (plan.authType == AuthType.LDAP) {
   semp['authenticationBasicType'] = 'ldap';
   semp['authenticationBasicProfileName'] = plan.authProfile;
 }
 else if (plan.authType == AuthType.Internal){
   semp['authenticationBasicType'] = 'internal';
 }
 return semp;
}
