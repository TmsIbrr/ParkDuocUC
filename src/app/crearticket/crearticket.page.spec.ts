import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearticketPage } from './crearticket.page';

describe('CrearticketPage', () => {
  let component: CrearticketPage;
  let fixture: ComponentFixture<CrearticketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearticketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
