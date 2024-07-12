import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChoosesComponent } from './why-chooses.component';

describe('WhyChoosesComponent', () => {
  let component: WhyChoosesComponent;
  let fixture: ComponentFixture<WhyChoosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyChoosesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyChoosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
