import { Component, Input, OnInit } from '@angular/core';
import { Films } from '../films.model';

@Component({
  selector: 'app-viewfilms-item',
  templateUrl: './viewfilms-item.component.html',
  styleUrls: ['./viewfilms-item.component.sass'],
})
export class ViewfilmsItemComponent implements OnInit {
  @Input('filmItemArray') filmItem: Films;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}
}
