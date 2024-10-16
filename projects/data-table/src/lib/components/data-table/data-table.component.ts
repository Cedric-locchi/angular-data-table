import {Component, computed, effect, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {colDef, dynamic} from '../../core';
import {DataTableManagerService} from '../../services/data-table.manager.service';
import {DateTime, Settings} from 'luxon';
import {JsonPipe, NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import {updateCLassList} from './service/data-table.utils';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {

  colDef: InputSignal<colDef[]> = input.required();
  dataSources: InputSignal<dynamic[]> = input.required();

  isLoading: InputSignal<boolean> = input(false);
  isCollapsible: InputSignal<boolean> = input(false);
  isStripped: InputSignal<boolean> = input(false);

  displayResult: InputSignal<boolean> = input(false);
  displayShadow: InputSignal<boolean> = input(false);

  localColDef = computed(() => this.colDef());

  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  readonly faSort = faSort;
  readonly componentId: string = Math.random().toString(36).substring(7);

  readonly dataTableManager: DataTableManagerService = inject(DataTableManagerService);

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

  ngOnInit() {
    Settings.defaultLocale = 'fr';
    this.dataTableManager.dataSources = this.dataSources();
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

}
