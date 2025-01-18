import {Component, inject} from '@angular/core';
import {AlertMessage} from "../../types/AlertMessage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage!: string;
  alertVisible: boolean = false;
  alertMessage: AlertMessage | undefined;
  registerForm!: FormGroup ;
  registered:Boolean = false;
  constructor(
    private authService:AuthenticationService,
    private route:Router
  ) {
  }
  public passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmationPassword = form.get('confirmationPassword')?.value;
    return password === confirmationPassword;
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl<string>("" , [Validators.required , Validators.email]),
      password: new FormControl<string>("" , [Validators.required, Validators.minLength(8)]),
      confirmationPassword: new FormControl<string>("" , [Validators.required, Validators.minLength(8)]),
      phoneNumber: new FormControl<string>("" , [Validators.required , Validators.min(10)]),
    } );
  }

  singUp() {
    this.alertVisible= false;
    if(this.registerForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next:(data)=> {
        this.registered = true;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account created successfully!',
          willClose: () => {
            this.route.navigateByUrl("auth/login");
          }
        }).then(() => {
          // Execute the redirection after a delay of 10 seconds (10000ms)
          setTimeout(() => {
            this.route.navigateByUrl("auth/login");
          }, 10000);
        });


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
