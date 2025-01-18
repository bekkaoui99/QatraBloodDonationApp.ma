import { Component } from '@angular/core';
import {AlertMessage} from "../../types/AlertMessage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token!: string;
  errorMessage!: string;
  alertVisible = false;
  alertMessage: AlertMessage | undefined;
  resetPasswordForm!: FormGroup;

  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
  ) {
  }

  public passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmationPassword = form.get('confirmationPassword')?.value;
    return password === confirmationPassword;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];

    if (!this.token) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Invalid or missing token. Please try resetting your password again.'
      });
      this.router.navigate(['/auth/login']);
    }


    this.resetPasswordForm = new FormGroup({
      email: new FormControl<string>("" , [Validators.required , Validators.email]),
      password: new FormControl("" , [Validators.required , Validators.minLength(8)]),
      confirmationPassword: new FormControl("" , [Validators.required , Validators.minLength(8)]),
    });

  }

  resetPassword() {
    this.alertVisible = false;

    if(this.resetPasswordForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    this.authService.resetPassword(this.resetPasswordForm.value , this.token).subscribe({
      next:(data)=>{
        this.authService.loadingData(data);
        this.router.navigateByUrl("/user/account")
      },
      error:(error)=>{
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
