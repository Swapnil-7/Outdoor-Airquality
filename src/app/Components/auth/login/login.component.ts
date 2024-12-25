import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceService } from 'src/app/Services/device.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  private variableSubject = new BehaviorSubject<boolean>(false); // Replace 'string' with the actual type of your variable
    variable$: Observable<boolean> = this.variableSubject.asObservable();

  constructor(private router: Router, private builder: FormBuilder, private deviceService: DeviceService) {
    // Initialize the form within the constructor to avoid errors
    this.loginForm = this.builder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // async login() {
  //   if (this.loginForm.valid) {
  //     let loginPayload = {
  //       userid: this.loginForm.controls['userid'].value,
  //       password: this.loginForm.controls['password'].value
  //     };
  //     console.log(loginPayload);
  
  //     // Call the login function in the DeviceService
  //     await this.deviceService.login(loginPayload);
  //   } else {
  //     this.markFormGroupTouched(this.loginForm);
  //     alert('Please enter both username and password');
  //   }
  // }
  // markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();

  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }

  login() {
    this.deviceService.getLogin(this.loginForm.value).subscribe((res: any) => {
          console.log(this.loginForm.value);
          if (res.sts === true && this.loginForm.valid ) {
            console.log(res);
            localStorage.setItem("token", res.sts);
            this.router.navigateByUrl('serial-command'); 
            this.variableSubject.next(true);
    
          } else {
            this.loginForm.markAsTouched();
               alert('please enter username and password');
                  // alert('Invalid username or password');
                }
    
        }, (err:any) => {
          console.log(err);
          alert("Login Failed");
          return err;
        })
      }
  
  ngOnDestroy(): void {

  }

}
