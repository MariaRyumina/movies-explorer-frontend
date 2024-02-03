//брейкпоинты ширины экрана
export const SMALL_SCREEN = 630;
export const MEDIUM_SCREEN = 990;
export const LARGE_SCREEN = 1280;

//количество фильмов в следующем ряду, ПРИ нажатии на кнопку "Еще"
export const MORE_MOVIES_ON_LARGE_SCREEN = 4;
export const MORE_MOVIES_ON_MEDIUM_SCREEN = 3;
export const MORE_MOVIES_ON_SMALL_SCREEN = 2;

//отображаемое количество фильмов, ДО нажатия на кнопку "Еще"
export const INITIAL_MOVIES_ON_LARGE_SCREEN = 16;
export const INITIAL_MOVIES_ON_MEDIUM_SCREEN = 12;
export const INITIAL_MOVIES_ON_SMALL_SCREEN = 8;
export const INITIAL_MOVIES_ON_X_SMALL_SCREEN = 5;

//длина короткометражек
export const MOVIE_DURATION = 40;

//коды ошибок и текст в popup
export const ERROR_CONFLICT_CODE = 409;
export const ERROR_NOT_FOUND_CODE = 404;
export const SUCCESSFUL_REGISTRATION = 'Вы успешно зарегистрированы';
export const SUCCESSFUL_UPDATE_USER_INFORMATION = 'Данные успешно обновлены!';
export const ERROR_CONFLICT = 'Пользователь с данным email уже зарегистрирован!';
export const ERROR_SERVER = 'Что-то пошло не так! Попробуйте ещё раз.';
export const ERROR_AUTH_INCORRECT_DATA = 'Вы ввели неправильные имя или пароль!';
export const ERROR_NOT_FOUND_MOVIES = 'Ничего не найдено!';
export const ERROR_VALIDATION_INCORRECT_NAME = 'Имя должно быть длиннее 2 символов';
export const ERROR_VALIDATION_INCORRECT_EMAIL = 'Введите корректный e-mail адрес';
export const ERROR_VALIDATION_INCORRECT_PASSWORD = 'Пароль должен быть длиннее 4 символов';
export const ERROR_VALIDATION_REQUIRED_FIELD = 'Обязательное поле';
export const ERROR_VALIDATION_REQUIRED_NAME = 'Введите название фильма!';

//валидация
export const REG_EXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VALID_NAME_LENGTH = 2;
export const VALID_PASSWORD_LENGTH = 4;
