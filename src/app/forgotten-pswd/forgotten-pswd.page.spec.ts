import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgottenPswdPage } from './forgotten-pswd.page';

describe('ForgottenPswdPage', () => {
  let component: ForgottenPswdPage;
  let fixture: ComponentFixture<ForgottenPswdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPswdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
