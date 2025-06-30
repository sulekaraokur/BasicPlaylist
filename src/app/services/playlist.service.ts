import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private playlists: Playlist[] = [];
  private activePlaylistId: string | null = null;

  constructor() {
    this.loadFromStorage();
    this.loadActivePlaylistId();
  }

  // Playlist oluştur ve aktif playlist olarak ata
  createPlaylist(name: string, description?: string): Playlist {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
    const playlist: Playlist = { id, name, description, songs: [] };
    this.playlists.push(playlist);
    this.activePlaylistId = id; // aktif playlist
    this.saveToStorage();
    localStorage.setItem('activePlaylistId', id);
    return playlist;
  }

  // Aktif playlist ID'sini oku
  private loadActivePlaylistId() {
    this.activePlaylistId = localStorage.getItem('activePlaylistId');
  }

  // Aktif playlist nesnesini döndür
  getActivePlaylist(): Playlist | undefined {
  const id = localStorage.getItem('activePlaylistId');
  if (!id) return undefined;
  return this.getPlaylistById(id);
}
  // Şarkı eklerken aktif playlist'e ekle
  addSongToActivePlaylist(song: Song) {
    const playlist = this.getActivePlaylist();
    if (playlist) {
      playlist.songs.push(song);
      this.saveToStorage();
    }
  }

  // Eski fonksiyonun güncellenmiş hali
  addSongToPlaylist(playlistId: string, song: Song) {
    const playlist = this.getPlaylistById(playlistId);
    if (playlist) {
      playlist.songs.push(song);
      this.saveToStorage();
    }
  }

  // Playlist'i ID ile bul
  getPlaylistById(id: string): Playlist | undefined {
    return this.playlists.find(p => p.id === id);
  }

  // Tüm playlistleri getir
  getAllPlaylists(): Playlist[] {
    return this.playlists;
  }

  // LocalStorage kaydet/oku
  saveToStorage() {
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }

  loadFromStorage() {
    const data = localStorage.getItem('playlists');
    if (data) this.playlists = JSON.parse(data);
  }

  deleteSongFromPlaylist(playlistId: string, songId: number) {
  const playlist = this.getPlaylistById(playlistId);
  if (playlist) {
    playlist.songs = playlist.songs.filter(song => song.id !== songId);
    this.saveToStorage();
  }
}


clearActivePlaylist() {
  localStorage.removeItem('activePlaylistId');
}

getAllFavoriteSongs(): Song[] {
  // Tüm playlistlerdeki favori şarkıları döndür.
  let favs: Song[] = [];
  for (const playlist of this.playlists) {
    favs.push(...playlist.songs.filter(song => song.isFavorite));
  }
  return favs;
}

// Playlist ve şarkı id ile favori kaldır
removeFromFavorites(songId: number) {
  for (const playlist of this.playlists) {
    const song = playlist.songs.find(s => s.id === songId);
    if (song) {
      song.isFavorite = false;
      this.saveToStorage();
      break;
    }
  }
}
deletePlaylist(playlistId: string) {
  const idx = this.playlists.findIndex(p => p.id === playlistId);
  if (idx > -1) {
    this.playlists.splice(idx, 1);
    this.saveToStorage();
    // Eğer aktif playlist silinirse localStorage’dan da kaldır
    const activeId = localStorage.getItem('activePlaylistId');
    if (activeId === playlistId) {
      localStorage.removeItem('activePlaylistId');
    }
  }
}

}
