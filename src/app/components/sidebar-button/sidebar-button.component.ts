import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss',
})
export class SidebarButtonComponent {
  @Input('link') link: string | undefined = undefined;
  @Input('icon') icon: string = '';
  @Output('click') click: EventEmitter<void> = new EventEmitter();
  @Input('pulse') pulse: boolean = false;
  @Input('color') color:
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'white'
    | 'pink' = 'red';
  @Input('title') title: string | undefined = undefined;

  constructor(private router: Router) {}

  emitClick() {
    if (this.link) this.router.navigate([this.link]);
    this.click.emit();
  }
}
