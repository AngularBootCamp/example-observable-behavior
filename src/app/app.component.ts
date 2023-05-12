import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Observer, map, share, tap } from 'rxjs';

import { jsonRequestHeaders } from './httpUtils';

interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  time: Observable<number>;
  name: Observable<string>;
  showData = true;
  showExtraTime = true;

  constructor(http: HttpClient) {
    this.name = http
      .get<Person>('https://swapi.devhttps://api.angularbootcamp.com/people/11/', {
        headers: jsonRequestHeaders
      })
      .pipe(
        tap(person => console.log(person)),
        map(person => person.name)
      );

    // Example of making an Observable:
    this.time = new Observable<number>(
      (observer: Observer<number>) => {
        console.log('Subscribing to time');
        const handle = window.setInterval(() => {
          console.log('emitting time');
          observer.next(new Date().getTime() % 10000);
        }, 100);
        // stop interval on unsubscribe
        return () => {
          console.log('Unsubscribing to time');
          clearInterval(handle);
        };
      }
    ).pipe(share()); // Try it without share().
  }
}
