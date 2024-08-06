import { Component, Input, OnInit, Inject } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { RiskResult } from '../../model/risk-result';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { RiskServiceService } from '../../services/risk-service.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './supplier-dialog.component.html',
  styleUrl: './supplier-dialog.component.css'
})

export class SupplierDialogComponent implements OnInit {
  riskList: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'entity_list',
    'entity_type',
    'address',
    'score'
  ];

  constructor(private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {razonSocial: string, nombreComercial: string},

  ) {}

  ngOnInit(): void {
    this.getRiskList();
  }

  getRiskList(): void {
    this.http.get(`https://webscrappingflask-h5gqf9b6b2h5dyef.eastus-01.azurewebsites.net/?search=${this.data.razonSocial}`)
      .subscribe((res: any) => {
        this.riskList = res;
        this.dataSource = new MatTableDataSource(this.riskList);
      });
  }
}

