import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'https://bank-system-74jr.onrender.com/api/account';

  constructor(private http: HttpClient) {}

  getAccounts() {

    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  
    return this.http.get(
      `${this.apiUrl}/my-accounts`,
      { headers }
    );
  }

  createAccount(data: any) {
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