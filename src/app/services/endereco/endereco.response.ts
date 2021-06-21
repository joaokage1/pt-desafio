export interface EnderecoResponsePayload {
    id: number;
    pais:string;
    estado:string;
    municipio:string;
    cep:number;
    rua:string;
    numero:number;
    complemento:string;
    message: string;
}