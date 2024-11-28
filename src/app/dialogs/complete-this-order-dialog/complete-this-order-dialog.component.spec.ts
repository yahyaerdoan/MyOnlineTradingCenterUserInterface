import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteThisOrderDialogComponent } from './complete-this-order-dialog.component';

describe('CompleteThisOrderDialogComponent', () => {
  let component: CompleteThisOrderDialogComponent;
  let fixture: ComponentFixture<CompleteThisOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteThisOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteThisOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
