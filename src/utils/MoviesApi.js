class MoviesApi {
    constructor({ baseURL }) {
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
        const token = localStorage.getItem('jwt');

        return fetch(this._baseUrl, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});