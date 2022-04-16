import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBoxesComponent } from './list-of-boxes.component';

describe('ListOfBoxesComponent', () => {
  let component: ListOfBoxesComponent;
  let fixture: ComponentFixture<ListOfBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBoxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
