import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertMessage} from "../../types/AlertMessage";
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  alertVisible = false;
  alertMessage: AlertMessage | undefined;
  singInForm!: FormGroup;

  constructor(
    private authService:AuthenticationService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.singInForm = new FormGroup({
      email: new FormControl<string>("" , [Validators.required , Validators.email]),
      password: new FormControl("" , [Validators.required , Validators.minLength(8)]),
    });
  }

  login() {
    this.alertVisible = false;

    if(this.singInForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    this.authService.login(this.singInForm.value).subscribe({
      next:(data)=>{
        this.authService.loadingData(data);
        this.router.navigateByUrl("/user/account")

      },
      error:(err)=>{
        this.alertVisible= true;
        this.alertMessage = {
          state:"error",
          message:err.error.message
        }
      }
    })
  }


}
