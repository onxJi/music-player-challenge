import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-player-challenge';

  audio = new Audio('./assets/forest-lullaby-110624.mp3');
  playing = false;

  play() {
    this.audio.play();
    this.playing = true;
  }

  pause() {
    this.audio.pause();
    this.playing = false;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
  }

  getProgress(): string {
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    return progress + '%';
  }

  updateProgress(e: MouseEvent) {
    const progressBar = this.progressBar.nativeElement;
    const percent = (e.offsetX / progressBar.clientWidth);
    const newTime = percent * this.audio.duration;

    this.audio.currentTime = newTime;
  }

  constructor(private el: ElementRef) { }

  get progressBar(): ElementRef {
    return this.el.nativeElement.querySelector('.progressbar-container');
  }
}
