import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './spinner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
}
