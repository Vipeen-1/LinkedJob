import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LinkedJob';

  constructor(private _authService:AuthService){}

  ngOnInit(){
    this._authService.autoSignIn();

    // Load the Google Identity Services API script asynchronously
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    console.log('line25 app.component ')

    script.onload = () => {
      // Initialize Google Identity Services API
      console.log('line29 app.component ')
      google.accounts.id.initialize({
        client_id: '935749022426-pd1dr2fsftgp49764kftlri6jqtm9qut.apps.googleusercontent.com', // Replace with your actual Google API client ID
        auto_prompt: false

      });
    };
  }

  onGoogleSignIn(){
    // Perform any additional actions you need when Google Sign-In is clicked
    // Trigger the Google Identity Services API prompt
    google.accounts.id.prompt();
    console.log('helllloooooooeeeeee')
  }

}
