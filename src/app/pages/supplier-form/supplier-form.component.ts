import { Component, inject, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Supplier } from '../../model/supplier';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SupplierDialogComponent } from '../supplier-dialog/supplier-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements AfterViewInit, OnInit{
  
  //Razon Social
  razonSocialFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  razonSocialMatcher = new MyErrorStateMatcher();
  //Nombre Comercial
  nombreComercialFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  nombreComercialMatcher = new MyErrorStateMatcher();
  //Identificación Tirbutaria - Numerica
  identificacionTributariaFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  identificacionTributariaMatcher = new MyErrorStateMatcher();
  //Email 
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailMatcher = new MyErrorStateMatcher();
  //Sitio Web
  sitioWebFormControl = new FormControl('', [Validators.required]);
  sitioWebMatcher = new MyErrorStateMatcher();
  //Dirección Fisica
  direccionFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  direccionMatcher = new MyErrorStateMatcher();
  //Facturación Anual en dolares - Numerico
  facturacionAnualFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  facturacionAnualMatcher = new MyErrorStateMatcher();

  displayedColumns: string[] = [
    'razonSocial',
    'nombreComercial',
    'identificacionTributaria',
    'email',
    'sitioWeb',
    'direccionFisica',
    'facturacionAnual',
    'ultimaModificacion',
    'actions'
  ];
  supplierList: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.getSupplierList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readonly dialog = inject(MatDialog);

  openDialog(element: Supplier):void{
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '500px',
      data: {
        razonSocial: element.razonSocial,
        nombreComercial: element.nombreComercial
      }
    });
  }

  getSupplierList(): void {
    this.http.get("https://backendey-hpe6hacaagfyb9e8.eastus-01.azurewebsites.net/api/Supplier")
      .subscribe((res: any) => {
        this.supplierList = res;
        this.dataSource = new MatTableDataSource(this.supplierList);
      });
  }
  deleteSupplier(id: any): void {
    this.http.delete(`https://backendey-hpe6hacaagfyb9e8.eastus-01.azurewebsites.net/api/Supplier/${id}`)
      .subscribe((res: any) => {
        console.log("eliminado")
        location.reload();
      });
  }
  postSupplier(): void {
    if (
      this.razonSocialFormControl.valid &&
      this.nombreComercialFormControl.valid &&
      this.identificacionTributariaFormControl.valid &&
      this.emailFormControl.valid &&
      this.sitioWebFormControl.valid &&
      this.direccionFormControl.valid &&
      this.facturacionAnualFormControl.valid
    ) {
      const supplierData = {
        razonSocial: this.razonSocialFormControl.value,
        nombreComercial: this.nombreComercialFormControl.value,
        identificacionTributaria: this.identificacionTributariaFormControl.value,
        numeroTelefonico: '944555666',
        email: this.emailFormControl.value,
        sitioWeb: this.sitioWebFormControl.value,
        direccionFisica: this.direccionFormControl.value,
        pais: 'Peru',
        facturacionAnual: this.facturacionAnualFormControl.value
      };
  
      this.http.post("https://backendey-hpe6hacaagfyb9e8.eastus-01.azurewebsites.net/api/Supplier", supplierData)
        .subscribe((res: any) => {
          console.log("Supplier created");
          location.reload();
        });
    } else {
      console.log('Please fill in all the required fields');
    }
  }
}
