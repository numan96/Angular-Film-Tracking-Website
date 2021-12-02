import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  //change to false state.
  isLoggedIn: Boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
