import { EnderecoResponsePayload } from "../../endereco/endereco.response";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    pis: string;
    endereco: EnderecoResponsePayload;
}