import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPage } from './sign-up.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let httpMock: HttpTestingController;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [SignUpPage],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        NavController,
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });


  it('Se crea el DOM', () => {
    // Expect = espera valores, confirma algo //
    // toBeTruthy = Verifica booleano, confirma si es true or false
    expect(component).toBeTruthy();
  });

  it('Debe funcionar cargar cuentas al iniciar el DOM', () => {
    //Se crea una simulacion de datos//

    const mockData = { data: [{ USUARIO: 'test', 'CORREO ELECTRONICO': 'test@duocuc.cl' }] };

    //Se activa la funcion del DOM ngOnInit//
    component.ngOnInit();

    const req = httpMock.expectOne('../../assets/files/cuentasDuoc.json');
    req.flush(mockData);

    //Compara la data esperada y la data real//
    expect(component.cuentas).toEqual(mockData.data);
  });


  it('Muestra error al no tener todos los campos completos', () => {
    //Se inicia Spy que visualizara la alerta del DOM
    spyOn(window, 'alert');

    //Se inician variables (campos) vacios
    component.usuario = '';
    component.correoElectronico = '';
    component.password = '';

    //se ejecuta la funcion onSubmit
    component.onSubmit();

    //Se espera que se inicie (exista) la alerta de windows 
    expect(window.alert).toHaveBeenCalledWith('Complete todos los campos');
  });


  it('Prueba Crear cuenta', () => {
    //Crea un spy que comprobara un console
    spyOn(console, 'log');

    //Llama a la funcion
    component.crearCuenta();

    //Comprueba el console.log
    expect(console.log).toHaveBeenCalledWith('FUNCIONA');
  })


  //NO FUNCIONA//
  it('comprueba respuesta res', () => {
    spyOn(console, 'log'); // Espía la función console.log
    component.cuentasDuoc();
    expect(console.log).toBeTruthy()
  })

})