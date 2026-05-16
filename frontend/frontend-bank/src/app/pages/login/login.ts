import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  correo = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  login() {
    // Validaciones básicas
    if (!this.correo.trim()) {
      this.errorMessage = 'Por favor ingresa tu correo';
      return;
    }
    if (!this.password.trim()) {
      this.errorMessage = 'Por favor ingresa tu contraseña';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    const data = {
      correo: this.correo,
      password: this.password
    };
    this.authService.login(data).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        this.errorMessage = error.error?.message || 'Credenciales incorrectas';
      }
    });
  
  }
}

