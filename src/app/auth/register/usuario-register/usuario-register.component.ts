import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { EnderecoRequestPayload } from 'src/app/services/endereco/endereco.request';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { UsuarioRequest } from 'src/app/services/usuario/models/usuario.request';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RegisterComponent } from '../register.component';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './usuario-register.component.html',
  styleUrls: ['./usuario-register.component.css']
})
export class UsuarioRegisterComponent implements OnInit {

  usuarioForm: FormGroup;
  usuarioRequest: UsuarioRequest;
  isError: boolean = false;
  enderecoRequest: EnderecoRequestPayload;

  constructor(private enderecoService: EnderecoService
    , private localStorage: LocalStorageService
    , private usuarioService: UsuarioService
    , private router: Router
    , private toastr: ToastrService) { 

    this.enderecoRequest = {
      pais: '',
      estado: '',
      municipio: '',
      cep: 0,
      numero: 0,
      rua: '',
      complemento: ''
    }

    this.usuarioRequest = {
      nome: '',
      email: '',
      cpf: '',
      pis: '',
      senha: '',
      endereco_id: 0
    }

    this.usuarioForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      pis: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.enderecoRequest = this.localStorage.retrieve('enderecoRequest');
  }

  cadastrarPessoa(){
    if (this.usuarioForm.get('nome')?.value 
        && this.usuarioForm.get('email')?.value
        && this.usuarioForm.get('cpf')?.value
        && this.usuarioForm.get('pis')?.value
        && this.usuarioForm.get('senha')?.value){
      this.usuarioRequest.nome = this.usuarioForm.get('nome')?.value;
      this.usuarioRequest.email = this.usuarioForm.get('email')?.value;
      this.usuarioRequest.cpf = this.usuarioForm.get('cpf')?.value;
      this.usuarioRequest.pis = this.usuarioForm.get('pis')?.value;
      this.usuarioRequest.senha = this.usuarioForm.get('senha')?.value;
       
      this.enderecoService.cadastrar(this.enderecoRequest).subscribe(data=> {       
        this.usuarioRequest.endereco_id = data // Problema de inserir mesmo que não de certo inserir o usuário

        if(data != -1){
          this.usuarioService.cadastrar(this.usuarioRequest).subscribe(data=> {
            if (data.message.includes('sucesso')){
              this.toastr.success('Cadastro', data.message, {
                timeOut: 4000,
              });
              this.router.navigateByUrl('');
            } 
          }, error => {
            this.isError = true;
            this.toastr.error('Cadastro', error.error.message, {
              timeOut: 4000,
            });
          });
        }
      }, error => {
        this.isError = true;
            this.toastr.error('Cadastro', error.error.message, {
              timeOut: 4000,
        });
      });

    }
  }

}
