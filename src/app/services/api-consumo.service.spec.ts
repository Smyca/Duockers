import { TestBed } from '@angular/core/testing';

import { ApiConsumoService } from './api-consumo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { mock } from '../mock/apiConsumo.mock';
import { of } from 'rxjs';
describe('ApiConsumoService', () => {
  let service: ApiConsumoService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiConsumoService(httpClientSpy);
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Obtener Datos', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mock));
    service.obtenerDatos().subscribe({
      next: (response) => {
        expect(response).toEqual(mock);
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get.calls.first().args[0]).toBe('https://apimocha.com/duocker/post')
        done();
      }
    });
  });
});
