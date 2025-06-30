export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string; 
  coverUrl: string; // albüm kapağı için resim URL
  isFavorite: boolean;
}
