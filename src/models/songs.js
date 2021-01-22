class Song {

    constructor(id, title, artist, album, year) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;

    }
}
let songs = [
    new Song(1, 'Believer', 'Imagine Dragon', 'Album 2017', 2017),
    new Song(2, 'Thunder', 'Imagine Dragon', 'Album 2017', 2017),
]

const songRepository = {

    findAll() {
        return songs;
    },
    findById(id) {
        let result = songs.filter(song => song.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }

}    

export  {
    Song,
    songRepository
}
