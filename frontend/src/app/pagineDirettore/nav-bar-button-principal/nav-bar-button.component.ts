import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-button',
  templateUrl: './nav-bar-button.component.html',
  styleUrls: ['./nav-bar-button.component.css']
})
export class NavBarButtonComponent {

  @Input() testo:string="";


}
