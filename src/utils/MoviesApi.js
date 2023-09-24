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
    });
}
