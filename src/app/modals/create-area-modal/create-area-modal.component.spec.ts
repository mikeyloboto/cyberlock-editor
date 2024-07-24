import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAreaModalComponent } from './create-area-modal.component';

describe('CreateAreaModalComponent', () => {
  let component: CreateAreaModalComponent;
  let fixture: ComponentFixture<CreateAreaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAreaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAreaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
