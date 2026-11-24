import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-actions-reset',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './actions-reset.component.html',
  styleUrl: './actions-reset.component.scss',
})
export class ActionsResetComponent {
  constructor(private actionService: ActionService) {}

  adminKey = '';
  label = '';
  loading = false;
  result: string | undefined;
  error: string | undefined;

  resetActions(): void {
    if (!this.adminKey || this.loading) {
      return;
    }

    const confirmed = window.confirm(
      'Se van a archivar y borrar TODAS las acciones registradas. ' +
        'Los ecopuntos de todo el mundo volverán a 0. ¿Seguro que quieres continuar?'
    );
    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.result = undefined;
    this.error = undefined;

    this.actionService.resetActions(this.adminKey, this.label).subscribe({
      next: ({ archived }) => {
        this.result = `Hecho: ${archived} acciones archivadas. ¡A por el nuevo curso!`;
        this.adminKey = '';
        this.label = '';
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error =
          err.status === 401
            ? 'La clave de administración no es correcta.'
            : err.error?.message || 'No se han podido vaciar las acciones.';
        this.loading = false;
      },
    });
  }
}
