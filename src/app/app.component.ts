import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActionFormComponent } from './action-form/action-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './services/user.service';
import { ActionService } from './services/action.service';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionTypeService } from './services/action-type.service';
import { ActionTypeFormComponent } from './action-type-form/action-type-form.component';
import { CommonModule } from '@angular/common';
import { combineLatest, filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ActionFormComponent,
    UserFormComponent,
    UserListComponent,
    ActionListComponent,
    ActionTypeFormComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ecopuntos';
  isLoading = true;
  users$ = this.userService.users$;
  actions$ = this.actionService.actions$;
  actionTypes$ = this.actionTypeService.actionTypes$;

  constructor(
    private userService: UserService,
    private actionService: ActionService,
    private actionTypeService: ActionTypeService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers();
    this.actionService.getActions();
    this.actionTypeService.getActionTypes();
    this.subscribeToInitialCalls();
    this.configurePrimeNG();
  }

  private subscribeToInitialCalls(): void {
    combineLatest([this.users$, this.actions$, this.actionTypes$])
      .pipe(
        filter((values) => values.every((value) => value.length)),
        take(1)
      )
      .subscribe(() => (this.isLoading = false));
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  configurePrimeNG(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: "Hoy",
      clear: "Limpiar",
      weekHeader: "Sem",
      firstDayOfWeek: 1 // Comienza la semana en lunes
    });
  }
}
