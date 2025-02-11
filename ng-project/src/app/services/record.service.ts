import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private http = inject(HttpClient);

  getAll(url: string): Observable<any> {
    return this.http.get(url);
  }
}