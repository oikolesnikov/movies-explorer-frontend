export const getMovies = async (context) => {
  context.setLoading(true);
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
      context.setLoading(false);
      localStorage.setItem('films', JSON.stringify(res))
      context.setLoading(false);

      return res;
    })
    .catch(e => {
      context.setLoading(false);
      context.setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      console.error(e);
    })
}
