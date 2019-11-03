import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {
  public columnDefinitions: string[] = ['email', 'vorname', 'nachname'];
  public data: any[];

  constructor(
    private http: HttpClient
  ) {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.http.get<any[]>('http://40.69.74.192:4222/api/user').subscribe((users) => {
      this.data = users;
    });
  }

  ngOnInit() {
  }

}
