import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mini-photo',
  imports: [],
  templateUrl: './mini-photo.html',
  styleUrl: './mini-photo.scss'
})
export class MiniPhoto {
  @Input() url! : string;
}
