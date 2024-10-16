import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
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
    {headerName: 'Titre', field: 'title', isBold: true},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Date de création', field: 'creationDate', isDate: true},
    {headerName: 'Note', field: 'rating'},
  ];

}
