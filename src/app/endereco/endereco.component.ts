import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { EnderecoRequestPayload } from '../services/endereco/endereco.request';
import { EnderecoService } from '../services/endereco/endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  enderecoForm: FormGroup;
  enderecoRequest: EnderecoRequestPayload;
  isError: boolean = false;

  constructor(private router: Router
    , private enderecoService: EnderecoService
    , private toastr: ToastrService
    , private cookieStorage: CookieService) { 
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

  editar(){

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

      this.enderecoService.atualizar(this.enderecoRequest,Number(this.cookieStorage.get('endereco_id'))).subscribe(data =>{
        if (data.message.includes('atualizado')){
          this.toastr.success('Atualizado', data.message, {
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
    } else {
      this.toastr.error('Atualizar Endereço', 'Verifique todos os campos e tente novamente', {
        timeOut: 4000,
      });
    }
  }
}
