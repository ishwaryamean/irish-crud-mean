import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNavComponent } from './my-nav.component';

describe('MyNavComponent', () => {
  let component: MyNavComponent;
  let fixture: ComponentFixture<MyNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyNavComponent]
    });
    fixture = TestBed.createComponent(MyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
