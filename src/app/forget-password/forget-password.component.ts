import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent  implements OnInit{

  forgetForm:FormGroup;

  error:any='';
  success:boolean = false;

  constructor(private fb:FormBuilder,
              private authService:AuthService){}

  ngOnInit(){
    this.forgetForm= this.fb.group({
      email:[null]
    })
  }

  onFormSubmit(){
    console.log(this.forgetForm.value);
    this.authService.forgetPassword(this.forgetForm.value).subscribe(
      (res)=>{
        console.log(res);
        this.error='';
        this.success=true;
      },
      (err)=>{
        console.log(err);
        this.error = err;
        // this.forgetForm.reset();
      }
      )
  }
}
