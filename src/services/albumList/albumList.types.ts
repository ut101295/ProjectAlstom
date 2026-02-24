export interface AlbumResult {
  wrapperType: string;
  kind: string;
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName: string;
  collectionName?: string;
  trackName: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  longDescription?: string;
  shortDescription?: string;
}

export interface AlbumListResponse {
  resultCount: number;
  results: AlbumResult[];
}

export interface AlbumListState {
  data: AlbumListResponse;
  loading: boolean;
  error: string | null;
}
