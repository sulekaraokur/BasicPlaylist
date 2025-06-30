import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { PlaylistForm } from './components/playlist-form/playlist-form';
import { PlaylistList } from './components/playlist-list/playlist-list';
import { FavoritesPage } from './components/favorites-page/favorites-page';
import { PlaylistDetail } from './components/playlist-detail/playlist-detail';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'add', component: PlaylistForm },
  { path: 'songs', component: PlaylistList },          // << All Songs
  { path: 'favorites', component: FavoritesPage },
  { path: 'playlist/:id', component: PlaylistDetail }, // << Playlist detay sayfası!
  { path: '**', redirectTo: '' }
];
