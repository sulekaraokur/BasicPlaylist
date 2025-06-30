import { Component } from '@angular/core';
import { Song } from '../../models/song';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Playlist } from '../../models/playlist';
//import { OnInit } from '@angular/core';
//import { RouterLink } from '@angular/router';
//import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
],
  templateUrl: './playlist-form.html',
  styleUrls: ['./playlist-form.css']
})
export class PlaylistForm  {


  playlistName: string = '';
  playlistDesc: string = '';
  activePlaylist: Playlist | null = null;

  newSong: Song = {
    id: 0,
    title: '',
    artist: '',
    duration: '',
    coverUrl: '',
    isFavorite: false
  };

 

createPlaylist() {
  if (!this.playlistName) return;
  this.activePlaylist = this.playlistService.createPlaylist(this.playlistName, this.playlistDesc);
}
  constructor(private playlistService : PlaylistService, private snackBar: MatSnackBar){}

addSong() {
  const playlist = this.playlistService.getActivePlaylist();
  if (!playlist) {
    this.snackBar.open('Lütfen önce bir playlist oluştur!', 'OK', { duration: 2000 });
    return;
  }
  this.newSong.id = Date.now();
  this.playlistService.addSongToActivePlaylist({ ...this.newSong });
  this.snackBar.open('The song is added!', 'OK', { duration: 1800 });
  this.resetForm();
}

  resetForm() {
    this.newSong = {
      id: 0,
      title: '',
      artist: '',
      duration: '',
      coverUrl: '',
      isFavorite: false
    };
  }

  resetPlaylist() {
  this.activePlaylist = null;
  this.playlistService.clearActivePlaylist();
  this.playlistName = '';
  this.playlistDesc = '';
}
}
