class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    //проверка корректности ответа, вызывать при каждом запросе
    _handleResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => this._handleResponse(res))
    }

    login(email, password) {
        return fetch (`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => this._handleResponse(res))
            .then((data) => {
                if (data != null && data.token) {
                    localStorage.setItem('jwt', data.token);
                    return true;
                }
            })
    }

    //запрос для проверки валидности токена
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                return this._handleResponse(res)
            })
    }

    //загрузка информации о пользователе с сервера
    getUserInfo() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._handleResponse(res))
    }

    //обновление информации пользователя на сервере
    updateUserInfo({ name, email }) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        })
            .then(res => this._handleResponse(res))
    }

    //загрузка сохраненных фильмов
    getSavedMoviesList() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }

    //сохранение фильма/добавление в избранное
    saveMovie(movie) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailerLink: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.thumbnail,
                movieId: movie.movieId,
            })
        })
            .then(res => {
                return this._handleResponse(res)
            })
    }

    //удаление фильма
    deleteMovie(id) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.movies.ryumina.nomoredomainsmonster.ru',
})
