import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableItemComponent } from './data-table-item.component';

describe('DataTableItemComponent', () => {
  let component: DataTableItemComponent;
  let fixture: ComponentFixture<DataTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
