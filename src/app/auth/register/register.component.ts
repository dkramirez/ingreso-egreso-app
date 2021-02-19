import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroform: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.registroform = this.fb.group({
      nombre:   ['', Validators.required],
      correo:   ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  crearUsuario(){

    if(this.registroform.invalid){return}

    Swal.fire({
      title: 'Espere por favor...!',
      didOpen: () => {
        Swal.showLoading()
      },
    });

      const  {nombre, correo, password}= this.registroform.value;
                this.authService.crearUsuario(nombre, correo, password)
                .then( credenciales =>{
                  console.log(credenciales);
                  Swal.close();

                  this.router.navigateByUrl('/');

                }).catch(err =>{

                  Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: err.message,
                  })
                });

  }
}
