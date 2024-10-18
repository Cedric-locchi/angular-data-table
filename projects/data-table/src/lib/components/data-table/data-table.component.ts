import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  InputSignal,
  OnInit,
  Output, signal, Signal, WritableSignal,
} from '@angular/core';
import {colDef, dynamic} from '../../core';
import {DataTableManagerService} from '../../services/data-table.manager.service';
import {DateTime, Settings} from 'luxon';
import {JsonPipe, NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faGripVertical, faSort, faTableColumns} from '@fortawesome/free-solid-svg-icons';
import {updateCLassList} from './service/data-table.utils';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, tap} from 'rxjs';


type rowClicked = {
  item: string;
  col: colDef;
  index: number;
}

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {

  localColDef: Signal<colDef[]> = computed(() => this.colDef());

  colDef: InputSignal<colDef[]> = input.required();
  dataSources: InputSignal<dynamic[]> = input.required();

  isLoading: InputSignal<boolean> = input(false);
  isCollapsible: InputSignal<boolean> = input(false);
  isStripped: InputSignal<boolean> = input(false);

  displayResult: InputSignal<boolean> = input(false);
  displayShadow: InputSignal<boolean> = input(false);
  displayBorder: InputSignal<boolean> = input(false);
  displaySearchBar: InputSignal<boolean> = input(false);

  searchControl: FormControl = new FormControl('');
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  displayColumnManager: WritableSignal<boolean> = signal(false);

  @Output() searchControlValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() rowIsClicked: EventEmitter<rowClicked> = new EventEmitter<rowClicked>();

  readonly faSort = faSort;
  readonly faTableColumns = faTableColumns;
  readonly componentId: string = Math.random().toString(36).substring(7);
  readonly dataTableManager: DataTableManagerService = inject(DataTableManagerService);

  get colDefVisible(): colDef[] {
    return this.localColDef().filter((col: colDef) => col.isVisible);
  }

  sortByColumn(col: colDef) {
    const field = col.field;
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection[field] = direction;
    this.sortDataSource(field, direction, col);
  }

  hoverLine(event: any) {
    updateCLassList(event, (item: Element) => {
      item.classList.add('hovered');
    })
  }

  removeHoveredLine(event: any) {
    updateCLassList(event, (item: Element) => {
      item.classList.remove('hovered');
    })
  }

  clicked(item: string, col: colDef, index: number) {
    const obj: rowClicked = {item, col, index};
    this.rowIsClicked.emit(obj);
  }

  updateVisibility(col: colDef) {
    col.isVisible = !col.isVisible;
  }

  ngOnInit() {
    Settings.defaultLocale = 'fr';
    this.dataTableManager.dataSources = this.dataSources();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((value: string) => {
          this.searchControlValue.emit(value);
        })
      )
      .subscribe()
  }

  private sortDataSource(field: string, direction: 'asc' | 'desc', col: colDef) {
    this.dataSources().sort((a, b) => {
      let comparison = 0;

      if (col.isDate) {
        const dateA = DateTime.fromISO(a[field]);
        const dateB = DateTime.fromISO(b[field]);
        comparison = dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
      } else {
        comparison = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  }


  protected readonly faGripVertical = faGripVertical;
}
