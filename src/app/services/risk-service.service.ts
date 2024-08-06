import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RiskServiceService {

  basePath = 'https://webscrappingflask-h5gqf9b6b2h5dyef.eastus-01.azurewebsites.net/?search=';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() =>
      new Error('Something happened with request, please try again later'));
  }
  getRiskList(razonSocial: string){
  return this.http.get(`${this.basePath}${razonSocial}`, this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));
  }
}
