import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ErrorService } from '../Services/error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../authInterface/auth-response';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  loginMode:boolean=true;
  user!:SocialUser;
  loggedIn?: boolean;

  authForm:FormGroup;

  constructor(private fb:FormBuilder,
              private _authService :AuthService,
              private _errService:ErrorService,
              private router:Router,
              private activateRoute:ActivatedRoute,
              private socialAuthService: SocialAuthService ){}

  errorMessage:string='';

  ngOnInit(){

    this._authService.user.subscribe((res)=>{
      if(res){
        this.router.navigate(['Home'])
      }
    })

    this.authForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })

    this.activateRoute.queryParamMap.subscribe(res=>{
      let qParams = res.get('SignUp')

      if(qParams){
        this.loginMode=false;
      }else{
        this.loginMode=true;
      }

    })

    //method for sign in with google with using the socialAuthService.
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      this._authService.googleSignIn(user.idToken).subscribe(
        (res)=>{console.log(res)
        this.router.navigate(['Home'])},
        (err)=>{console.log(err)}
      )
    });

  }

  onLogModeChange(){
    this.loginMode = !this.loginMode;
    this.authForm.reset();
  }

  onFormSubmit(){

    const email= this.authForm.value.username;
    console.log(email)
    const password= this.authForm.value.password;

    let authObservable: Observable<AuthResponse>

    if(this.loginMode){
      authObservable = this._authService.signIn(email,password)
    }else{
      authObservable = this._authService.signUp(email,password)
    }

    authObservable.subscribe((res)=>{
      console.log('auth componenet: ',res)
      if(res.registered){
        alert('Successfully Logged In!')
        this.router.navigate(['Home'])
      }
      // console.log(res)
    }
    ,err=>{
      console.log(err)
      this.errorMessage= err;

      alert('An Error Occured: '+ this.errorMessage)
      
    });
  }

  onEmptyFormSubmit(){
    if(this.authForm.invalid){
      console.log('helloooooooo')
      alert('Please Enter Username and Password!!')
    }
  }

  onGoogleSignIn(){
    console.log('hello')
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user)=>{
        console.log(user);
        this._authService.googleSignIn(user.idToken).subscribe(
          (res)=>{console.log(res);
            console.log('hello')},
          (err)=>{console.log(err)}
        )
      }
    )
  }


}
