import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-obstacle',
  standalone: true,
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.scss'],
  imports: [CommonModule]
})
export class ObstacleComponent  implements OnInit {

  @Input() height!: number;
  @Input() width!: number;
  @Input() top!: number;
  @Input() left!: number;
  @Input() rotation!: number;
  
  constructor() { }

  ngOnInit() {}

}
