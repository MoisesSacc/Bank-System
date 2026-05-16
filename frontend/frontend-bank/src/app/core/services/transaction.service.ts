import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://bank-system-74jr.onrender.com/api/transaction';

  constructor(private http: HttpClient) {}

  getTransactions(cuentaId: string) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });

    return this.http.get(
      `${this.apiUrl}/${cuentaId}`,
      { headers }
    );
  }

  transfer(data: any) {

    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  
    return this.http.post(
      `${this.apiUrl}/transfer`,
      data,
      { headers }
    );
  }

  createTransaction(data: any) {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  
    return this.http.post(
      `${this.apiUrl}/create`,
      data,
      { headers }
    );
  }
}