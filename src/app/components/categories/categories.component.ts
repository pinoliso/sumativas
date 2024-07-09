import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: []
})
export class CategoriesComponent {
  id!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
  }

  play(category: any) {
    
    this.router.navigate([category.route]);
  }

  categories: { [key: string]: any } = {
    '1': { 
      title: 'Juegos de Cartas', 
      items: [
        { 
          img: 'assets/pocker.webp', 
          name: 'Poker',
          description: 'Disfruta del clásico juego de poker. Apuesta, farolea y gana grandes premios.',
          price: '$ 1.200',
          charge: 1200,
          route: './game/1'
        },
        { 
          img: 'assets/blackjack.webp', 
          name: 'Blackjack',
          description: 'Intenta llegar a 21 en este emocionante juego de cartas. ¡Buena suerte!',
          price: '$ 1.000',
          charge: 1000,
          route: '../../game/2'
        },
        { 
          img: 'assets/baccarat.webp', 
          name: 'Baccarat',
          description: 'Prueba tu suerte y habilidades en el elegante juego de Baccarat. ¡Adelante!',
          price: '$ 1.100',
          charge: 1100,
          route: '../../game/3'
        }
      ]
    },
    '2': { 
      title: 'Juegos de Azar', 
      items: [
        { 
          img: 'https://ansaldo.cl/wp-content/uploads/2022/03/23774.jpg', 
          name: 'Ajedrez Electrónico',
          description: 'Experimenta el futuro del ajedrez con nuestro Tablero de Ajedrez Electrónico.',
          price: '$7.990',
          charge: 7990
        },
        { 
          img: 'https://cdnx.jumpseller.com/whimshop-spa/image/17380791/resize/610/610?1626919749', 
          name: 'Ajedrez Magnético Plegable',
          description: 'Disfruta del ajedrez en cualquier lugar con nuestro práctico Tablero de Ajedrez Magnético Plegable.',
          price: '$6.990',
          charge: 6990
        },
        { 
          img: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/8a8901bf-ce4e-446a-a1e1-09644f5bf1a2.b0148f208c4f0c9ab27bb5ee5108f5f1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 
          name: 'Ajedrez de Lujo - Madera de Nogal y Arce',
          description: 'Tablero de Ajedrez de Lujo, elaborado artesanalmente con maderas de nogal y arce de la más alta calidad.',
          price: '$3.990',
          charge: 3990
        }
      ]
    },
  }
}
