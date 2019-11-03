import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdvancedTableDataSource } from './advanced-table-datasource';
import {UserService} from '../user.service';
import {UserInterface} from '../interfaces/UserInterface';

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.css']
})
export class AdvancedTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<UserInterface>;
  dataSource: AdvancedTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public columnDefinitions: string[] = ['email', 'vorname', 'nachname'];



  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.dataSource = new AdvancedTableDataSource(this.userService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
