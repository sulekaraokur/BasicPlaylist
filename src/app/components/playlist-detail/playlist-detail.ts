import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
@Component({
  standalone: true,
  selector: 'app-playlist-detail',
  imports: [CommonModule,
    FormsModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './playlist-detail.html',
  styleUrls: ['./playlist-detail.css']
})
export class PlaylistDetail {
  playlist: Playlist | undefined;

  editingCover = false;
  newCoverUrl:string = '';

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.playlist = this.playlistService.getPlaylistById(id);
    this.newCoverUrl = this.playlist?.coverUrl || '';
  }

  
updateCoverUrl() {
  if (!this.playlist) return;
  if (!this.newCoverUrl.trim()) {
    this.playlist.coverUrl = '';
  } else {
    this.playlist.coverUrl = this.newCoverUrl.trim();
  }
  this.editingCover = false;
  this.playlistService.saveToStorage();
}
  deleteSong(songId: number) {
    if (this.playlist) {
      this.playlistService.deleteSongFromPlaylist(this.playlist.id, songId);
      // Güncel playlisti tekrar al
      this.playlist = this.playlistService.getPlaylistById(this.playlist.id);
    }
  }

  toggleFavorite(song: Song) {
    song.isFavorite = !song.isFavorite;
    this.playlistService.saveToStorage();
  }

  setDefaultCover(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  // Sadece default-cover'a set et, yoksa sonsuz döngüye girebilir!
  if (!imgElement.src.endsWith('assets/default-cover.jpg')) {
    imgElement.src = 'assets/default-cover.jpg';
  }
}

}
