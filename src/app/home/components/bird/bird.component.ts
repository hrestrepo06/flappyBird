import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bird',
  standalone: true,
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
  imports: [CommonModule]
})
export class BirdComponent  implements OnInit {
  
  @Input() height!: number;
  @Input() width!: number;
  @Input() top!: number;
  
  constructor() { }

  ngOnInit() {}

}
