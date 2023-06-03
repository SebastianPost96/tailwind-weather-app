import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
