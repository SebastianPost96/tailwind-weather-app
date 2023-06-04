import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LocalLinkPipe} from '../../../pipes/local-link.pipe';
import {ResponsivenessService} from '../../../services/responsiveness.service';
import {WeatherData} from '../../../models/weather-data.model';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LocalLinkPipe],
  templateUrl: './today.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayComponent {
  @Input({required: true}) weatherData!: WeatherData;

  constructor(public responsive: ResponsivenessService) {
  }
}
