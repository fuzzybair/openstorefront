import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';

import {Message} from 'primeng/components/common/api';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public username: string = "admin";
	public password: string = "Secret1@";
	private returnUrl: string;
	public usernameError: string;
	public passwordError: string;
	public gotoPageId: string;
	constructor(public authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router) {}

	ngOnInit() {
		// reset login status
		this.authenticationService.logout();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
	}

	public login(): void {
		this.usernameError = "";
		this.passwordError = "";
		let requiredMessage: string = "Field is required or Format not accepted.";
		let invalidMessage: string = "Unable to login. Check username and password.";
		if (!this.username) {
			this.usernameError = requiredMessage;
		}
		if (!this.password) {
			this.passwordError = requiredMessage;
		}
		if (!this.usernameError && !this.passwordError) {
			this.authenticationService.login(this.username, this.password).subscribe(
				data => {
					if (data) {
						if (this.returnUrl === '') {
							let newUrlString: string = (data.url as string).replace(/\/$/, '');
							this.log(newUrlString);
							let newUrl: string[] = newUrlString.split("/");
							this.log(newUrl);
							this.router.navigate(newUrl);
						}
						else {
							this.router.navigate([this.returnUrl]);
						}
					}
					else {
						this.usernameError = this.passwordError = invalidMessage;
					}
				},
				error => {
					this.usernameError = this.passwordError = invalidMessage;
				});
		}
	}
	public logout(): void {
		this.authenticationService.logout().subscribe();
	}

	private log(item: any) {
		console.log(item);
		//this.messageService.add('HeroService: ' + message);
	}
}
