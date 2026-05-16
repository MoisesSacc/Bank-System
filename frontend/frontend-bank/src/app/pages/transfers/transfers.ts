import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { TransactionService } from '../../core/services/transaction.service';
import { AccountService } from '../../core/services/account.service';
@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NavbarComponent,
    SidebarComponent],
  templateUrl: './transfers.html',
  styleUrl: './transfers.css',
})
export class TransfersComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}
  accounts: any[] = [];
  cuentaOrigenId = '';
  numeroCuentaDestino = ''; 
  monto = 0;
  transfer() {

    const data = {
  
      cuentaOrigenId: this.cuentaOrigenId,
  
      numeroCuentaDestino: this.numeroCuentaDestino,
  
      monto: this.monto
  
    };
  
    this.transactionService.transfer(data).subscribe({
  
      next: (response: any) => {
  
        alert('Transferencia realizada correctamente');
  
        console.log(response);
  
      },
  
      error: (error) => {
  
        console.log(error);
  
        alert('Error al realizar transferencia');
  
      }
  
    });
  
  }
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
}
