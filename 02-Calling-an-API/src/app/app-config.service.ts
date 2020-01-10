import { Injectable }  from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class AppConfigService {
    static settings: IAppConfig;
    httpClient: HttpClient;
    handler: HttpBackend;

    constructor(private http: HttpClient, handler: HttpBackend) {
        this.httpClient = http;
        this.handler = handler;
    }

    load() {

        const jsonFile = `assets/appConfig.json`;
        return new Promise<void>((resolve, reject) => {
            this.httpClient = new HttpClient(this.handler);
            this.httpClient.get(jsonFile).toPromise().then((response : IAppConfig) => {
               AppConfigService.settings = <IAppConfig>response;

               console.log('Config Loaded');
               console.log( AppConfigService.settings);
               resolve();
               
            /*}).catch((response: any) => {
               reject(`Could not load the config file`);*/
            });
        });
    }
}

export interface IAppConfig {

    clientId: string
    domain: string
    audience: string

}
