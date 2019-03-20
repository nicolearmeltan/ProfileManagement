import { Profile } from "./../models/profile";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  private url = "http://localhost:3000/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token"
    })
  };

  constructor(private http: HttpClient) {}

  getProfiles(): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(this.url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Profile[]>("getProfiles", []))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
