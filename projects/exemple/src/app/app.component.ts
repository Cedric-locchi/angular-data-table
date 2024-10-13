import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataTableComponent} from '../../../data-table/src/lib/components';
import data from './ressources/data.json';
import {colDef, dynamic} from '../../../data-table/src/lib/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  dataSources: dynamic[] = data;
  colDef: colDef[] = [
    { field: 'name', headerName: 'Nom', isDate: false },
  ];

  constructor() {
    console.log(data);
  }

}
