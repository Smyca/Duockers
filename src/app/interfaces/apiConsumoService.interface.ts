import { Observable, of } from "rxjs";
import { mock } from "../mock/apiConsumo.mock";
import { Root } from "./api.interface";

export const IApiConsumoService: {
    obtenerDatos: () => Observable<Root>
} = {
    obtenerDatos: () => of(mock)
}