import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public username: string = "admin";
	public password: string = "Secret1@";
	private returnUrl: string;
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
		this.authenticationService.login(this.username, this.password).subscribe(
			data => {
				if (this.returnUrl === '') {
					let newUrlString:string = (data.url as string).replace(/\/$/, '');
					this.log(newUrlString);
					let newUrl: string[] = newUrlString.split("/");
					this.log(newUrl);
					this.router.navigate(newUrl);
				}
				else {
					this.router.navigate([this.returnUrl]);
				}
			},
			error => {
				this.log(error);
				//this.loading = false;
			});
	}
	public logout(): void {
		this.authenticationService.logout().subscribe();
	}

	private log(item: any) {
		console.log(item);
		//this.messageService.add('HeroService: ' + message);
	}
}
