
export class GlobalModel {
    // public static apiURL: string = 'http://25.47.229.56:3000';
    public static apiURL: string = 'http://localhost:3000';
  
    public static querysArtists = {
      GetAll: '/artista',
      GetID: '/LoginArt/',
      PostArtist: '/RegistroArt',
      DeleteArtist: '/borrarArt',
      UpdateArtist: '/artista',
      GetUser: '/artistaPorNombre'
    };
  
    public static querysConcerts = {
        GetAll: '/concierto',
        GetID: '/LoginConcierto/',
        PostConcert: '/RegistroConcierto',
        DeleteConcert: '/borrarConcierto',
        UpdateConcert: '/concierto',
        getCordenadas: '/cordenadas'
    };
  
  }