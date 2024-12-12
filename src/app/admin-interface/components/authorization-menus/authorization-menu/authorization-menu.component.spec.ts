import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationMenuComponent } from './authorization-menu.component';

describe('AuthorizationMenuComponent', () => {
  let component: AuthorizationMenuComponent;
  let fixture: ComponentFixture<AuthorizationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
