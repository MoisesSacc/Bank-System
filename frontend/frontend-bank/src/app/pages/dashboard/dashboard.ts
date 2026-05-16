import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { AccountService } from '../../core/services/account.service';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,
    SidebarComponent,
    CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];
  transactions: any[] = [];
  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}
  ngOnInit() {

    this.accountService.getAccounts().subscribe({
  
      next: (response: any) => {
  
        this.accounts = response;
  
        if (this.accounts.length > 0) {
          const cuentaId = this.accounts[0]._id;
          this.loadTransactions(cuentaId);
        }
  
      },
  
      error: (error) => {
        console.log(error);
  
      }
  
    });
  
  }
  loadTransactions(cuentaId: string) {

    this.transactionService.getTransactions(cuentaId).subscribe({
  
      next: (response: any) => {
  
        this.transactions = response;
  
      },
  
      error: (error) => {
  
        console.log(error);
  
      }
  
    });
  
  }
}
