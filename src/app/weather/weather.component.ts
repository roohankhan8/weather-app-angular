import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  constructor(private weatherService: WeatherService) {}
  
  weather: any;

  icon: string = '';

  name: string = '';

  summary: string = '';
  temprature: number = 0;
  feels: number = 0;
  pressure: number = 0;
  humidity: number = 0;

  city: string = 'Karachi';
  units: string = 'metric';

  handleOptionChange(option: string): void {
    this.units = option;
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res) => {
        console.log(res);

        this.weather = res;

        this.name=this.weather.name

        this.icon =
          'https://openweathermap.org/img/wn/' +
          this.weather.weather[0].icon +
          '@2x.png';

        this.summary = this.weather.weather[0].main;
        this.temprature = this.weather.main.temp;
        this.feels = this.weather.main.feels_like;
        this.pressure = this.weather.main.pressure;
        this.humidity = this.weather.main.humidity;
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API Called'),
    });
  }
}
