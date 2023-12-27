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
            .then(data => {
                if (data != null && data.token ) {
                    localStorage.setItem('jwt', data.token);
                    return true;
                }
            })
    }

    //загрузка информации о пользователе с сервера
    getUserInfo() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/profile`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._handleResponse(res))
    }

    //обновление информации пользователя на сервере
    updateUserInfo({ name, email }) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/profile`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        })
            .then(res => this._handleResponse(res))
    }

    //лайк/дизлайк фильма
    changeLikeMoviesCardStatus(id, isLike) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/saved-movies`, {
            method: isLike ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }

    //загрузка сохраненных фильмов
    getSavedMoviesList() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/saved-movies`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }

    //сохранение фильма на сервер
    addSavedMovieCard({ name, link }) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/saved-movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, link })
        })
            .then(res => this._handleResponse(res))
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.movies.ryumina.nomoredomainsmonster.ru',
})
