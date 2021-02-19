import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      usuario:  ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  login(){


    if(this.loginForm.invalid){return }

    Swal.fire({
      title: 'Espere por favor...!',
      didOpen: () => {
        Swal.showLoading()
      },
    });

      const {usuario, password} = this.loginForm.value;

     this.auth.loginUsuario(usuario, password)
                .then(credenciales =>{
                  //console.log(credenciales);
                  Swal.close();
                  this.router.navigateByUrl('/');
                }).catch(err =>{

                  Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: err.message,
                  })
                })
  }
}
