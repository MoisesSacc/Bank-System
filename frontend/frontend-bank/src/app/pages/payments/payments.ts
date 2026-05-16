import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { PaymentService } from '../../core/services/payment.service';
import { AccountService } from '../../core/services/account.service';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NavbarComponent,
    SidebarComponent],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class PaymentsComponent implements OnInit {
  accounts: any[] = [];
  servicio = '';
  cuentaOrigenId = '';
  monto = 0;
  constructor(
    private paymentService: PaymentService,
    private accountService: AccountService
  ) {}
  ngOnInit() {

    this.accountService.getAccounts().subscribe({
  
      next: (response: any) => {
  
        this.accounts = response;
  
      },
  
      error: (error) => {
  
        console.log(error);
  
      }
  
    });
  
  }
  payService() {

    const data = {
  
      cuentaId: this.cuentaOrigenId,
  
      servicio: this.servicio,
  
      monto: this.monto
  
    };
  
    this.paymentService.pay(data).subscribe({
  
      next: (response: any) => {
  
        alert('Pago realizado correctamente');
  
        console.log(response);
  
      },
  
      error: (error) => {
  
        console.log(error);
  
        alert('Error al realizar pago');
  
      }
  
    });
  
  }
}
