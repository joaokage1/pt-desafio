import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { EnderecoRequestPayload } from 'src/app/services/endereco/endereco.request';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  enderecoForm: FormGroup;
  enderecoRequest: EnderecoRequestPayload;
  isError: boolean = false;

  constructor( private router: Router, private localStorage: LocalStorageService) { 
    this.enderecoRequest = {
      pais: '',
      estado: '',
      municipio: '',
      cep: 0,
      numero: 0,
      rua: '',
      complemento: ''
    }

    this.enderecoForm = new FormGroup({
      pais: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      cep: new FormControl(0, Validators.required),
      numero: new FormControl(0, Validators.required),
      rua: new FormControl('', Validators.required),
      complemento: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  cadastrar(){

    if (this.enderecoForm.get('pais')?.value 
        && this.enderecoForm.get('estado')?.value
        && this.enderecoForm.get('municipio')?.value
        && this.enderecoForm.get('cep')?.value
        && this.enderecoForm.get('rua')?.value
        && this.enderecoForm.get('numero')?.value){
      this.enderecoRequest.pais = this.enderecoForm.get('pais')?.value;
      this.enderecoRequest.estado = this.enderecoForm.get('estado')?.value;
      this.enderecoRequest.municipio = this.enderecoForm.get('municipio')?.value;
      this.enderecoRequest.cep = this.enderecoForm.get('cep')?.value;
      this.enderecoRequest.rua = this.enderecoForm.get('rua')?.value;
      this.enderecoRequest.numero = this.enderecoForm.get('numero')?.value;
      this.enderecoRequest.complemento = this.enderecoForm.get('complemento')?.value;

      this.localStorage.store('enderecoRequest', this.enderecoRequest)
      this.router.navigateByUrl('signup-user');
    }
  }

}
