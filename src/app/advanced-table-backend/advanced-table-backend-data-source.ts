import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {merge, Observable, of} from 'rxjs';
import {UserService} from '../user.service';
import {UserInterface} from '../interfaces/UserInterface';
import {FormControl} from '@angular/forms';

/**
 * Data source for the AdvancedTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdvancedTableBackendDataSource extends DataSource<UserInterface> {
  data: UserInterface[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  filterControl: FormControl;

  constructor(
    private userService: UserService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserInterface[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      of(''),
      this.paginator.page,
      this.sort.sortChange,
      this.filterControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
    ];

    return merge(...dataMutations).pipe(switchMap(() => {
      return this.userService.getPagination(this.paginator.pageIndex, this.sort.active, this.sort.direction, this.filterControl.value);
    }), tap((daten) => {
      this.data = daten;
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

}
