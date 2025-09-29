import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrarGentePage } from './filtrar-gente.page';

describe('FiltrarGentePage', () => {
  let component: FiltrarGentePage;
  let fixture: ComponentFixture<FiltrarGentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarGentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
