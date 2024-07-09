import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  categories: { title: string; img: string; description: string; buttonText: string; route: string }[] = [
    { title: 'Juegos de Cartas', img: 'assets/cartas.webp', description: 'Disfruta de nuestros emocionantes juegos de cartas como Poker, Blackjack y más.', buttonText: 'Explorar Juegos de Cartas', route: '../categories/1' },
    { title: 'Juegos de Azar', img: 'assets/azar.webp', description: 'Prueba tu suerte con nuestros juegos de azar como la Ruleta, Tragamonedas y más.', buttonText: 'Explorar Juegos de Azar', route: '../categories/2' },
  ];
}
