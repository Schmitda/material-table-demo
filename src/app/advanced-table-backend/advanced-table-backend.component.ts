import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UserService} from '../user.service';
import {UserInterface} from '../interfaces/UserInterface';
import {AdvancedTableBackendDataSource} from './advanced-table-backend-data-source';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-advanced-table-backend',
  templateUrl: './advanced-table-backend.component.html',
  styleUrls: ['./advanced-table-backend.component.css']
})
export class AdvancedTableBackendComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<UserInterface>;
  dataSource: AdvancedTableBackendDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public columnDefinitions: string[] = ['email', 'vorname', 'nachname'];
  tableFilter: FormControl = new FormControl();


  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.dataSource = new AdvancedTableBackendDataSource(this.userService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterControl = this.tableFilter;
    this.table.dataSource = this.dataSource;
  }
}
