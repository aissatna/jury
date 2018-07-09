import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudentsComponent } from './info-students.component';

describe('InfoStudentsComponent', () => {
  let component: InfoStudentsComponent;
  let fixture: ComponentFixture<InfoStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
