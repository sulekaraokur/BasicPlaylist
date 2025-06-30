import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { Song } from '../../models/song';
import { PlaylistService } from '../../services/playlist.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


interface RecSong {
  title: string;
  artist: string;
  mood: 'happy' | 'chill' | 'sad';
  url: string;
  coverUrl:string;
  duration:string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink,
    MatIcon,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {
  moodSongs: RecSong[] = [
  // Happy
  {
    title: "Darlin'",
    artist: "The Beach Boys",
    mood: "happy",
    url: "https://music.youtube.com/watch?v=ZoY8pdDFA54",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Beach_Boys_-_Darlin%27.jpg/250px-Beach_Boys_-_Darlin%27.jpg",
    duration: "2:12" // :contentReference[oaicite:0]{index=0}
  },
  {
    title: "Delisin",
    artist: "Mert Demir",
    mood: "happy",
    url: "https://music.youtube.com/watch?v=lkRk4QJt7AE&list=OLAK5uy_moycgvGa66zgzPQHOk0IV7vQwj7JLCakU",
    coverUrl: "https://img.youtube.com/vi/lkRk4QJt7AE/hqdefault.jpg",
    duration: "2:21" // :contentReference[oaicite:1]{index=1}
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    mood: "happy",
    url: "https://music.youtube.com/watch?v=byFdFFgTnCc&list=LM",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Family_Affair_%28Mary_J._Blige_song%29.jpg/250px-Family_Affair_%28Mary_J._Blige_song%29.jpg",
    duration: "4:25" // :contentReference[oaicite:2]{index=2}
  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    mood: "happy",
    url: "https://music.youtube.com/watch?v=DlFXDl_ROAM&list=RDAMPLOLAK5uy_l0on1AnJskJL2j459EhM8z7AO7ckuerm8",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png/250px-Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
    duration: "4:11" // :contentReference[oaicite:3]{index=3}
  },

  // Chill
  {
    title: "Her",
    artist: "JVKE",
    mood: "chill",
    url: "https://music.youtube.com/watch?v=xITJ35Kwpv4&list=LM",
    coverUrl: "https://img.youtube.com/vi/xITJ35Kwpv4/hqdefault.jpg",
    duration: "2:51" // :contentReference[oaicite:4]{index=4}
  },
  {
    title: "Re",
    artist: "Mor ve Ötesi",
    mood: "chill",
    url: "https://music.youtube.com/watch?v=OsQk-oYw_1s",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/2b/Morveotesi_dunyayalansoyluyor.jpg",
    duration: "3:39" // :contentReference[oaicite:5]{index=5}
  },
  {
    title: "Comfortable",
    artist: "Victor Ray",
    mood: "chill",
    url: "https://music.youtube.com/watch?v=SVNzzi1U3GQ&list=RDAMPLOLAK5uy_l0on1AnJskJL2j459EhM8z7AO7ckuerm8",
    coverUrl: "https://img.youtube.com/vi/SVNzzi1U3GQ/hqdefault.jpg",
    duration: "3:48" // :contentReference[oaicite:6]{index=6}
  },
  {
    title: "Tell Me Why",
    artist: "Gotts Street Park & Olive Jones",
    mood: "chill",
    url: "https://music.youtube.com/watch?v=pkIoPUxZ_x0&list=RDAMPLOLAK5uy_l0on1AnJskJL2j459EhM8z7AO7ckuerm8",
    coverUrl: "https://img.youtube.com/vi/pkIoPUxZ_x0/hqdefault.jpg",
    duration: "—" // Süre bilgisi araştırılıyor
  },
  {
  title: "Don't Cry",
  artist: "Guns N' Roses",
  mood: "sad",
  url: "https://music.youtube.com/watch?v=G-oRhCHID_4&list=LM",
  coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Don%27t_Cry_by_Guns_N%27_Roses_US_CD.jpg/250px-Don%27t_Cry_by_Guns_N%27_Roses_US_CD.jpg",
  duration: "4:45" // :contentReference[oaicite:0]{index=0}
},
{
  title: "Dağıldım Sonunda",
  artist: "Mert Demir",
  mood: "sad",
  url: "https://music.youtube.com/watch?v=lW9gsT6_NaI&list=LM",
  coverUrl: "https://img.youtube.com/vi/lW9gsT6_NaI/hqdefault.jpg",
  duration: "3:45" // :contentReference[oaicite:1]{index=1}
},
{
  title: "One More Shot",
  artist: "Cil",
  mood: "sad",
  url: "https://music.youtube.com/watch?v=bZJrbbkklw8&list=LM",
  coverUrl: "https://img.youtube.com/vi/bZJrbbkklw8/hqdefault.jpg",
  duration: "2:21" // :contentReference[oaicite:2]{index=2}
},
{
  title: "Niyə Belə Uzundur Bu Yollar",
  artist: "No Land",
  mood: "sad",
  url: "https://music.youtube.com/watch?v=GZM_rubhrS8&list=LM",
  coverUrl: "https://img.youtube.com/vi/GZM_rubhrS8/hqdefault.jpg",
  duration: "3:49" // :contentReference[oaicite:3]{index=3}
},
{
  title: "Amor",
  artist: "Derik Fein",
  mood: "sad",
  url: "https://music.youtube.com/watch?v=lzRU-kbl15k&list=RDAMPLOLAK5uy_l0on1AnJskJL2j459EhM8z7AO7ckuerm8",
  coverUrl: "https://img.youtube.com/vi/lzRU-kbl15k/hqdefault.jpg",
  duration: "3:33" // :contentReference[oaicite:4]{index=4}
}
  ];

   constructor(private playlistService: PlaylistService, private snackBar: MatSnackBar) {}

   isSongInActivePlaylist(song: RecSong | null): boolean {
    if (!song || !this.activePlaylist) return false;
    return this.activePlaylist.songs.some(
      s => s.title === song.title && s.artist === song.artist
    );
  }

  get activePlaylist() {
    return this.playlistService.getActivePlaylist();
  }

   addRecommendedSongToPlaylist() {
    if (!this.recommendedSong) return;
    if (!this.activePlaylist) {
      this.snackBar.open('Lütfen önce bir playlist oluştur!', 'OK', { duration: 2000 });
      return;
    }
    const newSong: Song = {
      id: Date.now(),
      title: this.recommendedSong.title,
      artist: this.recommendedSong.artist,
      duration: this.recommendedSong.duration,
      coverUrl: this.recommendedSong.coverUrl,
      isFavorite: false
    };
    this.playlistService.addSongToPlaylist(this.activePlaylist.id, newSong);
    this.snackBar.open('The song is added to your playlist!', 'OK', { duration: 1800 });
  }

  recommendedSong: RecSong | null = null;
  feedbackMsg: string = '';

   getSongsByMood(mood: string): RecSong[] {
    return this.moodSongs.filter(song => song.mood === mood);
  }

 recommend(mood: 'happy' | 'chill' | 'sad') {
    const songs = this.getSongsByMood(mood);
    if (songs.length === 0) {
      this.recommendedSong = null;
      this.feedbackMsg = 'No song found for that mood! Please add your own song.';
      return;
    }
    const random = Math.floor(Math.random() * songs.length);
    this.recommendedSong = songs[random];
    this.feedbackMsg = '';
  }
}
