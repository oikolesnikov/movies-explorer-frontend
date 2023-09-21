export const getMovies = async (context) => {
  return await fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: "GET"
  })
  .then(res => res.json())
  .then(async res => {
    if (res.error) {
      throw await res
    } else {
      return await res
    }
  })
  .then(res => {
    context.setMovies(res);
    localStorage.setItem('films', JSON.stringify(res))

    return res;
  })
  .catch(e => {
    context.setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    console.error(e);
  })
}
