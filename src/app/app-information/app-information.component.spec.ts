import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInformationComponent } from './app-information.component';

describe('AppInformationComponent', () => {
  let component: AppInformationComponent;
  let fixture: ComponentFixture<AppInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppInformationComponent]
    });
    fixture = TestBed.createComponent(AppInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
