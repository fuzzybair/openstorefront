import {Component, OnInit} from '@angular/core';
import {BrandingService} from '../services/branding.service';
import {catchError, map, tap} from 'rxjs/operators';
import {Branding} from '../Models/Branding';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    private branding:Branding;
    private baseUrl = 'http://localhost:8080/openstorefront/';  // URL to storefront

    constructor(public brandingServcie: BrandingService) {}

    ngOnInit() {
        this.getBranding();
    }

    getBranding<Branding>(): void {
         this.brandingServcie.getCurrentBranding<Branding>()
		 .subscribe(data => this.branding = data,
            error=> this.log(error));
    }
    
    // ####### Branding ########
    getTitle():string{
        return this.branding.landingPageTitle;
    }
	
    getBanner():string{
        return this.branding.landingPageBanner;
    }
	
    getFooter():string{
        return this.branding.loginFooter;
    }
    
    getContent(): string{
        return this.branding.loginContentBlock;
    }
    
    getLogo(): string {
        var url = this.baseUrl + this.branding.loginLogoUrl;
		if(this.branding && this.branding.loginLogoUrl)
		{
			console.log(`url is ${url}`);
			return url;
		}
		return "";
    }
    
    getOverviewVideo() : string {
        return this.baseUrl + this.branding.loginOverviewVideoUrl;
    }
    
    getOverviewVideoPoster():string{
        return this.baseUrl + this.branding.loginOverviewVideoPosterUrl;
    }
    getRegistrationVideo(): string{
        return this.baseUrl + this.branding.loginRegistrationVideoUrl;
    }
    
    
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
        //this.messageService.add('HeroService: ' + message);
    }

}
