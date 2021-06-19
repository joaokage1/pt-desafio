import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../commons/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { 
      this.loginRequestPayload = {
        email: '',
        senha: ''
      };

      this.loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required)
      });;
    }

  ngOnInit(): void {
  }

  login() {
    this.loginRequestPayload.email = this.loginForm.get('email')?.value;
    this.loginRequestPayload.senha = this.loginForm.get('senha')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
