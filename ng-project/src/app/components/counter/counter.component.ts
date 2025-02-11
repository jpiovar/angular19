import { Component, signal, effect, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})

export class CounterComponent implements OnInit{

  counter = signal(0);

  point = signal(1);

  ngOnInit(): void {
    setTimeout(() => {
      this.point.set(2);
    }, 5000);
  }

  increment() {
    this.counter.update((value) => value + 1);
  }
  decrement() {
    this.counter.update((value) => value - 1);
  }

  reset() {
    this.counter.set(0);
  }

  private loggingEffect = effect(() => {
    debugger;
    console.log(`The count is: ${this.counter()}`);

    console.log(`The count is: ${this.point()}`);
  });


}

