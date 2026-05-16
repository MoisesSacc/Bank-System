import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://bank-system-74jr.onrender.com/api/payment';

  constructor(private http: HttpClient) {}

  pay(data: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });

    return this.http.post(
      `${this.apiUrl}/pay`,
      data,
      { headers }
    );
  }

}