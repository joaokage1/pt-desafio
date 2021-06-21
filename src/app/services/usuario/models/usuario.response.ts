import { Usuario } from "./usuario.model";

export interface UsuarioResponse {
    usuario: Usuario;
    message: string;
}