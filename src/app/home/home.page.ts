import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  play,
  volumeHighOutline,
  volumeMuteOutline
} from 'ionicons/icons';
import { BirdComponent } from "./components/bird/bird.component";
import { ObstacleComponent } from "./components/obstacle/obstacle.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, BirdComponent, ObstacleComponent],
})
export class HomePage implements OnInit {
  private platform = inject(Platform);

  container_height!: number;
  container_width!: number;

  gameStarted: boolean = false;
  gameOver: boolean = false;
  score: number = 0;
  
  musicActive: boolean = false;
  audio = new Audio('assets/music/ionic-bird-track.MP3');
  
  bird_height: number = 38;
  bird_width: number = 43;
  bird_position: number = 300;
  
  obstacle_height: number = 0;
  obstacle_width: number = 52;
  obstacle_position: number = this.container_width;
  obstacle_gap: number = 200;
  
  //bird_interval!: NodeJS.Timeout;
  bird_interval!: ReturnType<typeof setTimeout>;
  obstacle_interval!: ReturnType<typeof setTimeout>;

  constructor() {
    addIcons({play, volumeMuteOutline, volumeHighOutline})
  }

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.addGravity.bind(this), 24);
    this.obstacle_interval = setInterval(this.moveObstacle.bind(this), 24);
  }

  // ======== Tamanho del contenedor del juego =====
  setContainerSize() {
    this.container_height = this.platform.height();
    this.container_width =
    this.platform.width() < 576 ? this.platform.width() : 576;
  }
  
  // ===== Iniciar juego =====
  startGame(){
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
  }
  
  // ===== Agrega gravedad ======
  addGravity() {
    let gravity = 4.5;
    if (this.gameStarted) this.bird_position +=gravity;
  }
  
  
  //======  Saltar  ======
  jump(){
    if (this.gameStarted){
      if (this.bird_position < this.bird_position) this.bird_position = 0;
      else this.bird_position -= 60;
    }
  }
  
  //  ====== Mover obstaculo hacia adelante
  moveObstacle(){
    let speed: number = 6;
    
    if(this.container_width < 400) speed = 4;
    
    if(this.gameStarted && this.obstacle_position >= -this.obstacle_width) this.obstacle_position -= speed;
    else { 
      this.resetObstaclePosition(); 
      if (this.gameStarted) this.score++;
    }
    
    this.checkCollision();
  }
  
  // ===== Resetear la posicion del obstaculo
  resetObstaclePosition(){
    this.obstacle_position = this.container_width;
    this.obstacle_height = Math.floor(Math.random() * (this.container_height - this.obstacle_gap));
  }
  
  // ======= Game Over ========
  setGameOver(){
    this.gameStarted = false;
    this.gameOver = true;
    this.bird_position = 300;
  }
  
  // ===== Chequear si ocurre uns colision 
  checkCollision(){
    let top_obstacle_collision = this.bird_position >= 0 && this.bird_position < this.obstacle_height;
    let bottom_obstacle_collision = this.bird_position >= this.container_height - (this.container_height - this.obstacle_gap - this.obstacle_height) - this.bird_height  ;
    
    let floor_collision = (this.bird_position + 40) >= this.container_height;
    
    if (floor_collision) this.setGameOver()
    
    if (this.obstacle_position >= this.obstacle_width
        && this.obstacle_position <= this.obstacle_width + 80
        && (top_obstacle_collision || bottom_obstacle_collision)) {
      
        this.setGameOver();
    }
  }
  
  playMusic(){
    this.musicActive = !this.musicActive;
    
    if(this.musicActive){
      this.audio.play();
      this.audio.loop;
    }
    else this.audio.pause();
  }
  
}
