import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationPlayerComponent } from './classification-player.component';

describe('ClassificationPlayerComponent', () => {
  let component: ClassificationPlayerComponent;
  let fixture: ComponentFixture<ClassificationPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
