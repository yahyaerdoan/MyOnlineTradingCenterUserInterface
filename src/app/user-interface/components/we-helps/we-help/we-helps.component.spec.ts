import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeHelpsComponent } from './we-helps.component';

describe('WeHelpsComponent', () => {
  let component: WeHelpsComponent;
  let fixture: ComponentFixture<WeHelpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeHelpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeHelpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
