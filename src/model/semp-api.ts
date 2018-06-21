import { SempConfig } from './semp-api';
import {HttpClient, json} from 'aurelia-fetch-client';

export interface SempConfig {
  id: number,
  url: string,
  adminUser: string,
  adminPassword: string
}

function isNullOrEmpty(s: string) {
  return s == null || s == '';
}
export function isValidSempConfig(semp: SempConfig): boolean {
  return semp != null &&
        !(isNullOrEmpty(semp.adminUser) || isNullOrEmpty(semp.adminPassword)|| isNullOrEmpty(semp.url));
      // TODO: test valid URL format
}


function basicAuth(user: string, password: string): string {
  return 'Basic ' + Buffer.from(user+':'+password).toString('base64');
}
function getBaseClient(sempConfig: SempConfig, localUri: string): HttpClient {
  let client = new HttpClient();
  client.configure(cfg => {
    cfg.withBaseUrl(sempConfig.url+localUri)
    .withDefaults({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth(sempConfig.adminUser, sempConfig.adminPassword)
      }
    })
  });
  return client;
}

export class SempApi {

  /**
   * Creates a SEMP connection and POSTS the semp object to the server for creation.
   * Returns a Promise<object> with results from the request.
   * 
   * @param conn SEMP connectivity config
   * @param semp SEMP string to be POSTed over the semp-connection for creation
   */
  createVpn(conn: SempConfig, semp: string): Promise<object> {
    // create the VPN via SEMPv2
    // return postUrl(sempConn, semp)
    return this.postSemp(conn, '/msgVpns', semp)
      .then(data => {
        return data;
      });
  }
  
  getSempConfig(sempConn: SempConfig, path: string): Promise<object> {
    let client = getBaseClient(sempConn, '/SEMP/v2/config');
    return client.fetch(path)
      .then(response => response.json())
      .then(data => { 
        console.log('HTTP Response: ' + data);
        console.log('HTTP Response JSON: ' + JSON.stringify(data));
        return data;
      });
  }
  
  getSempMonitor(sempConn: SempConfig, path: string): Promise<object> {
    let client = getBaseClient(sempConn, '/SEMP/v2/monitor');
    return client.fetch(path)
      .then(response => response.json())
      .then(data => { 
        console.log('HTTP Response: ' + data);
        console.log('HTTP Response JSON: ' + JSON.stringify(data));
        return data;
      });
  }
  
  postSemp(sempConn: SempConfig, path: string, semp: string): Promise<object> {
    console.log('POSTing request ' + semp);
    let client = getBaseClient(sempConn, '/SEMP/v2/config');
    return client.fetch(path, 
        {
          method: 'post',
          body: semp
        })
        .then(response => response.json())
        .then(data => { 
          console.log('HTTP Response: ' + data);
          console.log('HTTP Response JSON: ' + JSON.stringify(data));
          return data;
        });
  }
}
