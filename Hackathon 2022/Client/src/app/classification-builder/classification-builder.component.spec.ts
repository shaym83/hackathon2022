import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationBuilderComponent } from './classification-builder.component';

describe('ClassificationBuilderComponent', () => {
  let component: ClassificationBuilderComponent;
  let fixture: ComponentFixture<ClassificationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
