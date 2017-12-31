import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(private authService: AuthenticationService,
		private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		this.log("checking login for " + state.url);
		return this.authService.isLoggedIn().map(authState => {
			if (!authState) {
				this.router.navigate(['Login'], {queryParams: {returnUrl: state.url}});
			}
			console.log('activate?', !!authState);
			return !!authState;
		}).take(1);
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		console.log(message);
		//this.messageService.add('HeroService: ' + message);
	}
}
