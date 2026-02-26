import { Component, OnInit } from '@angular/core';
import { ActionFormComponent } from '../action-form/action-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ActionListComponent } from '../action-list/action-list.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActionFormComponent, UserListComponent, ActionListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('BATUCÁN Ecopuntos');
    this.meta.addTags([
      {
        name: 'description',
        content: 'Tu app de confianza hecha con 💚 por Batucán',
      },
      { property: 'og:title', content: 'BATUCÁN Ecopuntos' },
      {
        property: 'og:description',
        content: 'Welcome to la fiesta de los ecopuntos!',
      },
      { property: 'og:image', content: 'https://i.ibb.co/dkJYNGz/header.png' },
      { property: 'og:url', content: 'https://batucan-ecopuntos.vercel.app' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
