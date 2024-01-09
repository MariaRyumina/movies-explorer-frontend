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
        return fetch(this._baseUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res));
    }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');