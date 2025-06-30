import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './favorites-page.html',
  styleUrls: ['./favorites-page.css']
})
export class FavoritesPage {
  favoriteSongs: Song[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.updateFavorites();
  }

  ngDoCheck() {
    this.updateFavorites();
  }

  private updateFavorites() {
    // Artık tüm playlistlerdeki favoriler!
    this.favoriteSongs = this.playlistService.getAllFavoriteSongs();
  }

  // Tüm playlistlerde arayıp favoriden kaldır
  toggleFavorite(song: Song) {
    this.playlistService.removeFromFavorites(song.id);
    this.updateFavorites();
    // Snackbar veya alert ile istersen "Favoriden çıkarıldı!" mesajı verirsin.
  }

  // Bonus: Silme de playlistte arayıp silmeli!
  deleteSong(songId: number) {
    // Tüm playlistlerde arayıp sil
    for (const playlist of this.playlistService.getAllPlaylists()) {
      const songIndex = playlist.songs.findIndex(s => s.id === songId);
      if (songIndex > -1) {
        playlist.songs.splice(songIndex, 1);
        this.playlistService.saveToStorage();
        break;
      }
    }
    this.updateFavorites();
  }
}
