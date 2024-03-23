const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'e2c4de89936e7c192950789bad4aa81a';

const genres = `/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=uk-UA&page=1&sort_by=popularity.desc`;

const genresList = `/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=uk-UA&page=1&sort_by=popularity.desc`

export {
    baseURL,
    apiKey,
    genres,
    genresList
}