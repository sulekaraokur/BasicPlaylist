import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-playlist-page',
  imports: [CommonModule],
  templateUrl: './shared-playlist-page.html',
  styleUrl: './shared-playlist-page.css',
    template: `
    <div class="shared-playlist-wrapper">
      <h2>Paylaşılan Playlist</h2>
      <p>Playlist detayları ve şarkı listesi burada gözükecek.</p>
    </div>
  `,
  styles: [`
    .shared-playlist-wrapper {
      margin: 48px auto;
      max-width: 540px;
      background: #f6f5fd;
      border-radius: 22px;
      padding: 36px;
      text-align: center;
      box-shadow: 0 5px 30px #a9a7e129;
    }
  `]
})
export class SharedPlaylistPage {

}
