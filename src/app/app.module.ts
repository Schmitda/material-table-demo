import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialTableComponent} from './material-table/material-table.component';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {AdvancedTableComponent} from './advanced-table/advanced-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {AdvancedTableBackendComponent} from './advanced-table-backend/advanced-table-backend.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MaterialTableComponent,
    AdvancedTableComponent,
    AdvancedTableBackendComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
