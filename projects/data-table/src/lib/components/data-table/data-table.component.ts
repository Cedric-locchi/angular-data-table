import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {colDef, dynamic} from '../../core';
import {DataTableManagerService} from '../../services/data-table.manager.service';
import {Settings} from 'luxon';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit{

  public dataSources: InputSignal<dynamic[]> = input.required();
  public colDef: InputSignal<colDef[]> = input.required();

  public sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  public readonly componentId: string = Math.random().toString(36).substring(7);

  protected readonly dataTableManager: DataTableManagerService = inject(DataTableManagerService);

  ngOnInit() {
    Settings.defaultLocale = 'fr';
    this.dataTableManager.dataSources = this.dataSources();
  }

}
