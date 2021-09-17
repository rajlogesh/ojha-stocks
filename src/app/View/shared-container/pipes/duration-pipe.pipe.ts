import {CommonModule} from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipePipe implements PipeTransform {

  units = ['Milliseconds', 'Seconds, Minutes, Hours'];

  constructor() {
  }

  transform(value: any, format: string): any {
    let duration;
    let units;

    if (value < 0.01) {
      duration = value * 1000;
      if (format === 'shortUnits') {
        units = 'ms';
        duration = Math.round(duration);
      } else {
        units = 'Milliseconds';
        duration = duration.toFixed(2);
      }
    } else if (value >= 0.01 && value < 60) {
      duration = value;
      if (format === 'shortUnits') {
        units = 's';
        duration = Math.round(duration);
      } else {
        units = 'Seconds';
        duration = duration.toFixed(2);
      }
    } else if (value > 60 && value < 3540) {
      duration = value / 60;
      if (format === 'shortUnits') {
        units = 'm';
        duration = Math.round(duration);
      } else {
        units = 'Minutes';
        duration = duration.toFixed(2);
      }
    } else if (value >= 3540) {
      duration = value / 3600;
      if (format === 'shortUnits') {
        units = 'h';
      } else {
        units = 'Hours';
      }
    }

    return (format === 'shortUnits') ? `${duration}${units}` : `${duration} ${units}`;
  }

}
