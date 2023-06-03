import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
