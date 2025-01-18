import { Component } from '@angular/core';
import {AlertMessage} from "../../types/AlertMessage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  errorMessage!:string ;
  forgetPasswordForm!: FormGroup;

  constructor(
    private authService:AuthenticationService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl<string>("" , [Validators.required , Validators.email])
    });
  }

  forgetPassword() {

    if(this.forgetPasswordForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    const email = this.forgetPasswordForm.get('email')?.value;
    this.authService.forgetPassword(email).subscribe({
      next:(data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'we have just sent an email to you , check your email'
        })
        this.router.navigateByUrl("/")
      },
      error:(error) =>{
        if (error.error && error.error.message) {
           this.errorMessage = error.error.message;
        } else if (error.message) {
          this.errorMessage = error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errorMessage
        });
      }
    })
  }

}
