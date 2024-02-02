import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import PopupInfo from '../PopupInfo/PopupInfo';
import iconOK from '../../images/icon_ok.png';
import iconError from '../../images/icon_error.png';
import {
    ERROR_AUTH_INCORRECT_DATA,
    ERROR_CONFLICT_CODE,
    ERROR_CONFLICT,
    ERROR_SERVER,
    MOVIE_DURATION,
    SUCCESSFUL_REGISTRATION,
} from "../../utils/constants";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    //вошёл пользователь в систему или нет
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ?? false);
    const [currentUser, setCurrentUser] = useState({});

    const [isPreloader, setIsPreloader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //ширина окна браузера
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    //иконка и текст в popup
    const [infoPopup, setInfoPopup] = useState({ img: null, title: null });
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    //фильмы с сервера (все 100 фильмов)
    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) ?? []);
    //найденные отфильтрованные фильмы
    const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem('foundMovies')) ?? []);
    //input на странице "Фильмы"
    const [valueMoviesInput, setValueMoviesInput] = useState((localStorage.getItem('valueMoviesInput')) ?? '');
    //короткометражки на странице "Фильмы"
    const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShortMovies')) ?? false);

    //фильмы, добавленные в сохраненные
    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
    //input на странице "Сохраненные фильмы"
    const [valueSavedMoviesInput, setValueSavedMoviesInput] = useState('');
    //короткометражки на странице "Сохраненные фильмы"
    const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);

    //сохранение данных в ЛС
    useEffect(() => {
        if (loggedIn) {
            localStorage.setItem('allMovies', JSON.stringify(allMovies));
            localStorage.setItem('valueMoviesInput', valueMoviesInput);
            localStorage.setItem('isShortMovies', JSON.stringify(isShortMovies));

            const foundFilms = moviesFiltration(allMovies, valueMoviesInput, isShortMovies);
            const saved = handleCheckLike(foundFilms, savedMovies);

            localStorage.setItem('foundMovies', JSON.stringify(saved));
            setFoundMovies(saved);
        }
    },[loggedIn, valueMoviesInput, isShortMovies, allMovies, savedMovies])

    //отслеживаю ширину окна, добавляю слушатель resize на window
    useEffect(() => {
        const handleResize = debounce((e) => setWidthWindow(e.target.innerWidth), 100);

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    //проверка токена на валидность
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) {
            mainApi.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch(err => {
                    localStorage.removeItem('jwt');
                    console.error(`Ошибка запроса проверки токена: ${err}`);
                })
        }
    }, [setLoggedIn])

    //регистрация
    function handleRegistration( name, email, password ) {
        mainApi.register( name, email, password )
            .then(res => {
                if (res) {
                    handleInfoPopup(iconOK, SUCCESSFUL_REGISTRATION);
                    handleOpenPopup();
                    handleAuthorization( email, password ) //после удачной регистрации автоматически авторизуется
                }
            })
            .catch(err => {
                if (err === ERROR_CONFLICT_CODE) {
                    handleInfoPopup(iconError, ERROR_CONFLICT);
                    handleOpenPopup();
                    console.error(`Ошибка регистрации: ${err}`);
                } else if (err) {
                    handleInfoPopup(iconError, ERROR_SERVER);
                    handleOpenPopup();
                    console.error(`Ошибка регистрации: ${err}`);
                }
            })
    }

    //авторизация
    function handleAuthorization( email, password ) {
        mainApi.login( email, password )
            .then(res => {
                if(res) {
                    setLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch(err => {
                handleInfoPopup(iconError, ERROR_AUTH_INCORRECT_DATA);
                handleOpenPopup();
                console.error(`Ошибка авторизации: ${err}`);
            })
    }

    //выход из аккаунта
    function handleLogout () {
        localStorage.clear();
        setValueMoviesInput('');
        setAllMovies([]);
        setIsShortMovies(false);
        setLoggedIn(false);
        setValueSavedMoviesInput('');
        setIsShortSavedMovies(false);
        setFoundMovies([]);
    }

    //загрузка обновленной информации о пользователе на сервер
    function handleUpdateUser ({ name, email }) {
        mainApi.updateUserInfo({ name, email })
            .then(resultUser => setCurrentUser(resultUser))
            .catch(err => {
                if (err === ERROR_CONFLICT_CODE) {
                    handleInfoPopup(iconError, ERROR_CONFLICT);
                    handleOpenPopup();
                    console.error(`Ошибка отправки данных о пользователе на сервер: ${err}`)
                } else if (err) {
                    handleInfoPopup(iconError, ERROR_SERVER);
                    handleOpenPopup();
                    console.error(`Ошибка отправки данных о пользователе на сервер: ${err}`)
                }
            })
    }

    //загрузка текущей информации о пользователе с сервера
    useEffect(() => {
        if(loggedIn) {
            mainApi.getUserInfo()
                .then(resultUser => setCurrentUser(resultUser))
                .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
        }
    }, [loggedIn])

    //получение списка сохраненных фильмов
    useEffect(() => {
        if(loggedIn) {
            mainApi.getSavedMoviesList()
                .then(savedMovies => {
                    savedMovies.map(saved => saved.isLiked = true);

                    setSavedMovies(savedMovies.reverse());
                })
        }
    }, [loggedIn])

    useEffect(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies])

    //добавляю новые свойство isLiked (true or false)
    function handleCheckLike (movies, saved) {
        return movies.map(m => {
            m.isLiked = saved.some(s => s.movieId === m.movieId);
            return m;
        })
    }

    //загрузка фильмов со стороннего сервера
    useEffect(() => {
        if (valueMoviesInput.length > 0) {
            if (allMovies.length !== 0) {
                setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
                setValueMoviesInput(localStorage.getItem('valueMoviesInput'));
                setIsShortMovies(JSON.parse(localStorage.getItem('isShortMovies')));
                setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
            } else {
                showPreloader();
                moviesApi.getBeatFilmCardList()
                    .then(movies => movies.map(movie => {
                        movie.isLiked = savedMovies.some(saved => saved.movieId === movie.movieId);
                        return movie;
                    }))
                    .then(movies => {
                        setAllMovies(movies);
                        localStorage.setItem('allMovies', JSON.stringify(movies));

                        setFoundMovies(moviesFiltration(movies, valueMoviesInput, isShortMovies));
                        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
                    })
                    .catch(err => console.error(`Ошибка загрузки фильмов с сервера: ${err}`))
                    .finally(() => hidePreloader());
            }
        }
    }, [valueMoviesInput, isShortMovies])

    //фильтрация фильмов по поисковому запросу и checkbox (возвращает массив отфильтрованных фильмов)
    function moviesFiltration(movies, valueInput, isShort) {
        return movies.filter(movie => (isShort ? movie.duration <= MOVIE_DURATION : movie)
            && (movie.nameRU.toLowerCase().includes(valueInput.toLowerCase())
                || movie.nameEN.toLowerCase().includes(valueInput.toLowerCase()))
        )
    }

    //лайк/дизлайк фильма на странице "Фильмы"
    function handleSaveMovie (movie) {
        if (movie.isLiked) {
            const savedMovie = savedMovies.find(m => m.movieId === movie.movieId) //возвращается необходимый фильм

            mainApi.deleteMovie(savedMovie._id)
                .then(() => {
                    allMovies.forEach(m => {
                        if(m.movieId === movie.movieId)
                            m.isLiked = false
                    })
                    setAllMovies(allMovies);
                    setSavedMovies(movie => movie.filter(m => m.movieId !== savedMovie.movieId))
                })
                .catch(err => console.error(`Ошибка удаления фильма из избранного: ${err}`))
        } else {
            mainApi.saveMovie(movie)
                .then(movie => {
                    allMovies.forEach(m => {
                        if (m.movieId === movie.movieId) {
                            m.isLiked = true
                        }
                    })
                    setAllMovies(allMovies);
                    setSavedMovies([movie, ...savedMovies])
                })
                .catch(err => console.error(`Ошибка сохранения фильма в избранное: ${err}`))
        }
    }

    //удаление фильма со страницы "Сохраненные фильмы"
    function handleDeleteMovie (savedMovie) {
        mainApi.deleteMovie(savedMovie._id)
            .then(() => {
                allMovies.forEach(m => {
                    if(m.movieId === savedMovie.movieId)
                        m.isLiked = false
                })
                setSavedMovies(movie => movie.filter(m => m.movieId !== savedMovie.movieId));
            })
            .catch(err => console.error(`Ошибка удаления фильма из избранного: ${err}`))
    }

    //изменение картинки и сообщения в InfoPopup
    function handleInfoPopup(img, title){
        setInfoPopup({ img, title });
    }

    function handleOpenPopup () {
        setIsOpenPopup(true);
    }

    function closePopup () {
        setIsOpenPopup(false);
    }

    //закрытие модального окна нажатием на 'Esc'
    useEffect(() => {
        const closePopupOnEsc = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        }
        document.addEventListener('keydown', closePopupOnEsc);
    })

    function showPreloader () {
        setIsPreloader(true);
        setIsLoading(true);
    }

    function hidePreloader () {
        setIsPreloader(false);
        setIsLoading(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="content">
                { ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname)
                    && <Header
                        loggedIn={loggedIn}
                        widthWindow={widthWindow}
                    />
                }
                <div className="main">
                    <Routes>
                        <Route
                            path='/*'
                            element={
                                <NotFoundPage />
                            }
                        />
                        { !loggedIn ? (
                            <Route
                                path='/signup'
                                element={
                                    <Register
                                        onRegister={handleRegistration}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signup'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }
                        { !loggedIn ? (
                            <Route
                                path='/signin'
                                element={
                                    <Login
                                        onLogin={handleAuthorization}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signin'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }

                        <Route
                            path='/'
                            element={
                                <Main />
                            }
                        />
                        <Route
                            path='/movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={Movies}
                                    movies={foundMovies}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                    onSaveMovie={handleSaveMovie}
                                    widthWindow={widthWindow}
                                    valueInput={valueMoviesInput}
                                    setValueInput={setValueMoviesInput}
                                    isShortMovies={isShortMovies}
                                    setIsShortMovies={setIsShortMovies}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route
                            path='/saved-movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={SavedMovies}
                                    movies={moviesFiltration(savedMovies, valueSavedMoviesInput, isShortSavedMovies)}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                    onDeleteMovie={handleDeleteMovie}
                                    valueInput={valueSavedMoviesInput}
                                    setValueInput={setValueSavedMoviesInput}
                                    isShortMovies={isShortSavedMovies}
                                    setIsShortMovies={setIsShortSavedMovies}
                                />
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={Profile}
                                    onUpdateUser={handleUpdateUser}
                                    onLogout={handleLogout}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                />
                            }
                        />
                    </Routes>
                </div>

                { (location.pathname === '/' ||
                        location.pathname === '/movies' ||
                        location.pathname === '/saved-movies')
                    && <Footer />
                }

                <Preloader
                    isOpen={isPreloader}
                />

                <PopupInfo
                    isOpen={isOpenPopup}
                    onClose={closePopup}
                    img={infoPopup.img}
                    title={infoPopup.title}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
