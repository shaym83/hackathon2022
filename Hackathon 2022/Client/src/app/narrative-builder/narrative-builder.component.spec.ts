import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeBuilderComponent } from './narrative-builder.component';

describe('NarrativeBuilderComponent', () => {
  let component: NarrativeBuilderComponent;
  let fixture: ComponentFixture<NarrativeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrativeBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarrativeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
