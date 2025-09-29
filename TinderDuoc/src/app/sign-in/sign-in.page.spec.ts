import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { SignInPage } from './sign-in.page';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;
  let navCtrl: NavController;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const navCtrlMock = {
      navigateRoot: jasmine.createSpy('navigateRoot'),
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      declarations: [SignInPage],
      providers: [
        { provide: NavController, useValue: navCtrlMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    httpMock = TestBed.inject(HttpTestingController);

    // Espía para localStorage
    spyOn(localStorage, 'setItem');
  });



  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });


  
  it('debería cargar las cuentas correctamente desde el archivo JSON', () => {
    const mockCuentas = {
      data: [
        {
            "ID USUARIO": 1,
            "USUARIO": "benjayweas",
            "CORREO ELECTRONICO": "benjayweas@duocuc.cl",
            "CONTRASENA": "ben",
            "NOMBRE": "Benjamin",
            "APELLIDO": "Gonzales",
            "EDAD": 27,
            "DESCRIPCION": "Explorador de nuevas aventuras. Amante del caf\u00e9, los libros y las caminatas al atardecer. Siempre aprendiendo algo nuevo",
            "Foto": null
        },
        {
            "ID USUARIO": 2,
            "USUARIO": "sebamax097",
            "CORREO ELECTRONICO": "sebamax097@duocuc.cl",
            "CONTRASENA": "seb",
            "NOMBRE": "Sebastian",
            "APELLIDO": "Ramirez",
            "EDAD": 18,
            "DESCRIPCION": "Entusiasta de la tecnolog\u00eda y las series. Compartiendo mi pasi\u00f3n por los gadgets y los juegos retro. \u00a1Hablemos de ciencia ficci\u00f3n!",
            "Foto": null
        }
      ]
    };

    const cuentasRequest = httpMock.expectOne('../../assets/files/cuentasDuoc.json');
    cuentasRequest.flush(mockCuentas);

    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled()

    expect(component.cuentas).toEqual(mockCuentas.data);
  });



  it('debería navegar a home cuando el usuario y la contraseña son correctos', () => {
    // Simulamos que las cuentas ya fueron cargadas
    component.cuentas = [
      { USUARIO: 'usuario1', CONTRASENA: '12345', 'ID USUARIO': '1' }
    ];

    component.usuario = 'usuario1';
    component.password = '12345';

    component.IniciarSesion();

  });



  it('debería mostrar una alerta cuando el usuario o la contraseña son incorrectos', () => {
    component.cuentas = [
      { USUARIO: 'usuario1', CONTRASENA: 'contraseña1', 'ID USUARIO': '1' }
    ];

    component.usuario = 'usuarioInvalido';
    component.password = 'contraseñaInvalida';


    component.IniciarSesion();

  });
});
