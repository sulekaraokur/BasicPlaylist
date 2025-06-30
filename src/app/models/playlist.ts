 import { Song } from './song';

export interface Playlist {
    id:string;
    name:string;
    description?:string;
    songs: Song[];
     coverUrl?: string;
 } 