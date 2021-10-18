import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipanimationComponent } from './flipanimation.component';

describe('FlipanimationComponent', () => {
  let component: FlipanimationComponent;
  let fixture: ComponentFixture<FlipanimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipanimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
