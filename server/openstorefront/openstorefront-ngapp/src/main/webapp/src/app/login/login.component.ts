import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {Message} from 'primeng/components/common/api';
import {AuthenticationService} from '../services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public username: string;
	public password: string;
	private returnUrl: string;
	public loginError: boolean;
	public gotoPageId: string;

	public loginform: FormGroup;
	constructor(public authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder) {}

	ngOnInit() {
		// reset login status
		this.authenticationService.logout();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
		this.loginform = this.formBuilder.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required]
		});
	}

	public login(value: string): void {
		this.loginError = false;
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
					this.loginError = true;
				}
			},
			error => {
				this.loginError = true;
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
