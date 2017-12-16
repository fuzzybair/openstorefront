import {Component, OnInit} from '@angular/core';
import {BrandingService} from '../services/branding.service';
import {Branding} from '../Models/Branding';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    private branding;
    private baseUrl = 'http://localhost:8080/openstorefront/';  // URL to storefront

    constructor(public brandingServcie: BrandingService) {}

    ngOnInit() {
        this.getBranding();
    }

    getBranding(): void {
         this.brandingServcie.getCurrentBranding()
            .subscribe(data => this.branding = data,
            error=> this.log(error));
    }
    
    // ####### Branding ########
    getFooter():string{
        return this.branding.loginFooter;
    }
    
    getContent(): string{
        return this.branding.loginContentBlock;
    }
    
    getLogo(): string {
        return this.baseUrl + decodeURI(this.branding.loginLogoUrl);
    }
    
    getOverviewVideo() : string {
        return this.baseUrl + decodeURI(this.branding.loginOverviewVideoUrl);
    }
    
    getOverviewVideoPoster():string{
        return this.baseUrl + decodeURI(this.branding.loginOverviewVideoPosterUrl);
    }
    getRegistrationVideo(): string{
        return this.baseUrl + decodeURI(this.branding.loginRegistrationVideoUrl);
    }
    
    
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
        //this.messageService.add('HeroService: ' + message);
    }

}
