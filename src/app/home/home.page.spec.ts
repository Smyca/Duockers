import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { HomePage } from './home.page';
import { ApiConsumoService } from '../services/api-consumo.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiService: ApiConsumoService;
  let navCtrl: NavController;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const navCtrlMock = {
      navigateRoot: jasmine.createSpy('navigateRoot'),
    };

    const apiServiceMock = {
      obtenerDatos: jasmine.createSpy('obtenerDatos').and.returnValue(of([{ id: 1, name: 'Test Data' }])),
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      declarations: [HomePage],
      providers: [
        { provide: ApiConsumoService, useValue: apiServiceMock },
        { provide: NavController, useValue: navCtrlMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiConsumoService);
    navCtrl = TestBed.inject(NavController);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'data') return null; //Se simula que no hay data en localStorage
      return null;
    });
    spyOn(localStorage, 'setItem'); 
  });



  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar datos desde la API si localStorage está vacío', () => {
    component.ngOnInit();

    expect(apiService.obtenerDatos).toHaveBeenCalled();

  });

  it('Se prueba funcion Filtrar', () => {
    component.Filtrar();
  });
});
