import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from './interfaces/UserInterface';
import {SortDirection} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<UserInterface[]>('http://40.69.74.192:4222/api/user');
  }

  getPagination(pageIndex: number, columnName: string, direction: SortDirection, filter: string) {
    return this.http.get<UserInterface[]>('http://40.69.74.192:4222/api/user', {
      params: {
        page: pageIndex.toString(),
        sortBy: columnName,
        direction: direction as string,
        globalFilter: filter
      }
    });
  }
}
