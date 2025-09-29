import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
import { of } from 'rxjs';

// Mock de NavController
class MockNavController {
  navigateRoot = jasmine.createSpy('navigateRoot');
}


describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let httpMock: HttpTestingController;
  let navCtrl: MockNavController;

  beforeEach(async () => {  
    navCtrl = new MockNavController();

    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule], // Importa módulos necesarios
      providers: [
        { provide: NavController, useValue: navCtrl }, // Usa el mock del NavController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inyecta HttpTestingController para manejar llamadas HTTP simuladas
  });

  it('Deberia activar el page', () => {
    expect(component).toBeTruthy();
  });


  ////////////////////////////////////
  it('Prueba que NgInit Funcione correctamente', () => {
    const mockCuentas = { data: [{ 'ID USUARIO': 1, 'USUARIO': 'TestUser' }] };
    spyOn(component, 'cuentasDuoc').and.returnValue(of(mockCuentas));
  
    component.ngOnInit();
  
    expect(component.cuentasDuoc).toHaveBeenCalled();
    expect(component.traerNombre).toHaveBeenCalled();
    expect(component.cuentas).toEqual(mockCuentas.data);
  });
  //////////////////////////////////////////

  
  it('Trae las cuentas de cuentasDuoc.json', () => {
    const mockData = { data: [
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
      },
      {
          "ID USUARIO": 3,
          "USUARIO": "smyl",
          "CORREO ELECTRONICO": "smyl@duocuc.cl",
          "CONTRASENA": "smy",
          "NOMBRE": "Samuel",
          "APELLIDO": "Alarcon",
          "EDAD": 27,
          "DESCRIPCION": "Viajero empedernido \u2708\ufe0f | Fot\u00f3grafo aficionado \ud83d\udcf8 | Buscando el pr\u00f3ximo rinc\u00f3n del mundo por descubrir \ud83c\udf0d.",
          "Foto": null
      },
      {
          "ID USUARIO": 4,
          "USUARIO": "joaquinLavin",
          "CORREO ELECTRONICO": "joaquinLavin@duocuc.cl",
          "CONTRASENA": "joa",
          "NOMBRE": "Joaquin",
          "APELLIDO": "Lavin",
          "EDAD": 18,
          "DESCRIPCION": "Programador de d\u00eda, so\u00f1ador de noche. Fan de la m\u00fasica indie y las pel\u00edculas cl\u00e1sicas. Amante del minimalismo y el buen dise\u00f1o.",
          "Foto": null
      },
      {
          "ID USUARIO": 5,
          "USUARIO": "Borchs",
          "CORREO ELECTRONICO": "Borchs@duocuc.cl",
          "CONTRASENA": "Bor",
          "NOMBRE": "Gabriel",
          "APELLIDO": "Boric",
          "EDAD": 18,
          "DESCRIPCION": "Cocinero aficionado \ud83c\udf73 | Fan\u00e1tico de los deportes \ud83c\udfc0 | Siempre buscando la receta perfecta para la vida.",
          "Foto": null
      },
      {
          "ID USUARIO": 6,
          "USUARIO": "ADMIN",
          "CORREO ELECTRONICO": "ADMIN@duocuc.cl",
          "CONTRASENA": "ADMIN",
          "NOMBRE": "Admin",
          "APELLIDO": "Admin",
          "EDAD": 23,
          "DESCRIPCION": "Artista en constante evoluci\u00f3n. \ud83c\udfa8 Amante del cine y la poes\u00eda. Creyente de que una sonrisa lo cambia todo.",
          "Foto": null
      },
      {
          "ID USUARIO": 7,
          "USUARIO": "luv.fer",
          "CORREO ELECTRONICO": "luv.fer@duocuc.cl",
          "CONTRASENA": "luv",
          "NOMBRE": "Fernanda",
          "APELLIDO": "Lopez",
          "EDAD": 19,
          "DESCRIPCION": "Geek de coraz\u00f3n \u2764\ufe0f | Videojuegos, c\u00f3mics y cultura pop. Me encontrar\u00e1s maratoneando la \u00faltima serie de moda",
          "Foto": null
      },
      {
          "ID USUARIO": 8,
          "USUARIO": "cmiilnda",
          "CORREO ELECTRONICO": "cmiilnda@duocuc.cl",
          "CONTRASENA": "cmi",
          "NOMBRE": "Camila",
          "APELLIDO": "Sepulveda",
          "EDAD": 23,
          "DESCRIPCION": "Creador de contenido | Apasionado por el marketing digital \ud83d\udcf1 | Siempre dispuesto a aprender y compartir ideas.",
          "Foto": null
      },
      {
          "ID USUARIO": 9,
          "USUARIO": "pedro",
          "CORREO ELECTRONICO": "pedro@duocuc.cl",
          "CONTRASENA": "ped",
          "NOMBRE": "Pedro",
          "APELLIDO": "Pascal",
          "EDAD": 18,
          "DESCRIPCION": "Fitness y bienestar. \ud83c\udfcb\ufe0f\u200d\u2640\ufe0f Inspirando a llevar una vida activa y saludable. Persiguiendo metas, tanto dentro como fuera del gimnasio.",
          "Foto": null
      },
      {
          "ID USUARIO": 10,
          "USUARIO": "jose",
          "CORREO ELECTRONICO": "jose@duocuc.cl",
          "CONTRASENA": "jos",
          "NOMBRE": "Jose",
          "APELLIDO": "Maria",
          "EDAD": 24,
          "DESCRIPCION": "Defensor del medio ambiente \ud83c\udf31 | Activista en pro del cambio positivo. Juntos, podemos hacer del mundo un lugar mejor.",
          "Foto": null
      }
  ] };

    component.cuentasDuoc().subscribe((res) => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne('../../assets/files/cuentasDuoc.json');
    req.flush(mockData);
  });

  it('Setea el usuario obtenido', () => {
    const mockCuentas = [
      { 'ID USUARIO': 1, 'USUARIO': 'ADMIN', 'NOMBRE': 'ADMIN', 'APELLIDO': 'ADMIN', 'DESCRIPCION': 'ADMIN', 'EDAD': '18' }
    ];
    component.cuentas = mockCuentas;
    // Se simula extracciond de localStorage num 1
    spyOn(localStorage, 'getItem').and.returnValue('1');

    component.traerNombre();

  });

  it('Navega a editarPerfil', () => {
    component.EditarPerfil();
    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/editar-perfil');
  });

  it('Navega a compartirPerfil', () => {
    component.CompartirPerfil();
    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  });
});
