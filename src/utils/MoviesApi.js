class MoviesApi {
    constructor(baseURL) {
        this._baseUrl = baseURL;
    }

    //проверка корректности ответа, вызывать при каждом запросе
    _handleResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }

    //загрузка фильмов с внешнего сервера на сайт
    getBeatFilmCardList() {
        return fetch(this._baseUrl + "/beatfilm-movies", {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
            .then(movies => movies.map(elem => ({
                country: elem.country,
                director: elem.director,
                duration: elem.duration,
                year: elem.year,
                description: elem.description,
                image: this._baseUrl + elem.image.url,
                trailerLink: elem.trailerLink,
                nameRU: elem.nameRU,
                nameEN: elem.nameEN,
                thumbnail: this._baseUrl + elem.image.formats.thumbnail.url,
                movieId: elem.id,
            })));
    }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co');
