export interface EnderecoRequestPayload {
    pais: string;
    estado: string;
    municipio: string;
    cep: number;
    rua: string;
    numero: number;
    complemento?: string;
}