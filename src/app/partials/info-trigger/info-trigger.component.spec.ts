import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTriggerComponent } from './info-trigger.component';

describe('InfoTriggerComponent', () => {
  let component: InfoTriggerComponent;
  let fixture: ComponentFixture<InfoTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTriggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
