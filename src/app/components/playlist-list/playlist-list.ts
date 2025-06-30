import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service'; 
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Playlist } from '../../models/playlist';


@Component({
  standalone: true,
  selector: 'app-playlist-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './playlist-list.html',
  styleUrls: ['./playlist-list.css']
})
export class PlaylistList {
  songs: Song[] = [];
  playlists:Playlist[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngDoCheck() {
    const playlistId = localStorage.getItem('activePlaylistId');
    if (playlistId) {
      const playlist = this.playlistService.getPlaylistById(playlistId);
      this.songs = playlist ? playlist.songs : [];
    } else {
      this.songs = [];
    }
  }

  deleteSong(songId: number) {
    const playlistId = localStorage.getItem('activePlaylistId');
    if (playlistId) {
      this.playlistService.deleteSongFromPlaylist(playlistId, songId);
    }
  }

  toggleFavorite(song: Song) {
    song.isFavorite = !song.isFavorite;
    this.playlistService.saveToStorage();
  }


  ngOnInit() {
  this.playlists = this.playlistService.getAllPlaylists();
}
deletePlaylist(playlistId: string) {
  this.playlistService.deletePlaylist(playlistId);
  // Listeyi güncelle
  this.playlists = this.playlistService.getAllPlaylists();
}
}
