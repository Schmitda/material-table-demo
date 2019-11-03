import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {merge, Observable} from 'rxjs';
import {UserService} from '../user.service';
import {UserInterface} from '../interfaces/UserInterface';

/**
 * Data source for the AdvancedTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdvancedTableDataSource extends DataSource<UserInterface> {
  data: UserInterface[] = [];
  paginator: MatPaginator;
  sort: MatSort;

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
      this.userService.getAll(),
      this.paginator.page,
      this.sort.sortChange
    ];

    dataMutations[0].subscribe((users) => {
      this.data = users;
    });

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserInterface[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserInterface[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'vorname':
          return compare((a.firstName || '').toLowerCase(), (b.firstName || '').toLowerCase(), isAsc);
        case 'nachname':
          return compare((a.lastName || '').toLowerCase(), (b.lastName || '').toLowerCase(), isAsc);
        case 'email':
          return compare((a.email || '').toLowerCase(), (b.email || '').toLowerCase(), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
