import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInformationsComponent } from './legal-informations.component';

describe('LegalInformationsComponent', () => {
  let component: LegalInformationsComponent;
  let fixture: ComponentFixture<LegalInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalInformationsComponent]
    });
    fixture = TestBed.createComponent(LegalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
