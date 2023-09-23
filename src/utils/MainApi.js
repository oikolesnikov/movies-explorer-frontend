import { toast } from 'react-toastify';

export const login = async ({ email, password }, context) => {
  context.setLoading(true);

  const body = JSON.stringify({
    email, password
  })

  return await fetch(`http://api.oikolesnikov.domain.nomoreparties.co:81/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
  })
    .then(async res => {
      if (res.statusText !== 'OK') {
        throw await res.json();
      } else {
        return await res.json();
      }
    })
    .then(user => {
      context.setCurrentUser(user);
      context.setLoading(false);

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    }).catch(e => {
      context.setLoading(false);
      context.setError(e.message);
      console.error(e);
      throw new Error(e);
    })
};

export const registration = async ({ email, password, name }, context) => {
  context.setLoading(true);

  const body = JSON.stringify({
    email, password, name
  })

  return await fetch(`http://api.oikolesnikov.domain.nomoreparties.co:81/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
  })
    .then(async res => {
      if (res.statusText !== 'OK') {
        throw await res.json();
      } else {
        return await res.json();
      }
    })
    .then(user => {
      context.setCurrentUser(user);
      context.setLoading(false);

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    })
    .catch(e => {
      context.setLoading(false);
      context.setError(e.message);
      console.error(e);
      throw new Error(e);
    })
}

export const getMe = async ({ _id }, context) => {
  context.setLoading(true);

  return await fetch(`http://api.oikolesnikov.domain.nomoreparties.co:81/me/${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
    .then(async res => {
      if (res.statusText !== 'OK' && res.status !== 401) {
        throw await res.json()
      } else {
        return await res.json();
      }
    })
    .then(user => {
      context.setCurrentUser(user);
      context.setLoading(false);

      return user
    })
    .catch(e => {
      context.setLoading(false);
      context.setError(e.message);
      console.error(e);
      throw new Error(e);
    })
}

export const editProfile = async ({ email, name, token }, context) => {
  context.setLoading(true);

  return await fetch(`http://api.oikolesnikov.domain.nomoreparties.co:81/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
    body: JSON.stringify({ email, name })
  })
    .then(async res => {
      if (res.statusText !== 'OK' && res.status !== 401) {
        throw await res.json();
      } else if (res.status === 401) {
        throw 401;
      } else {
        return await res.json();
      }
    })
    .then(res => res).then(user => {

      const oldStorage = JSON.parse(localStorage.getItem('user'))

      localStorage.setItem('user', JSON.stringify({ ...oldStorage, name: user.name, email: user.email }));

      context.setCurrentUser({ ...user, token: oldStorage.token });
      context.setLoading(false);

      toast('Данные успешно обновлены')

      return user;
    })
    .catch(e => {
      context.setLoading(false);
      context.setError("Не удалось изменить профиль");
      console.error(e);
      return e
    })
}


export const getLiked = async (context) => {
  return await fetch('http://api.oikolesnikov.domain.nomoreparties.co:81/movies', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  }).then(async res => {
    if (res.statusText !== 'OK' && res.status !== 401) {
      throw await res.json();
    } else if (res.status === 401) {
      localStorage.clear();
      throw 401
    } else {
      return await res.json();
    }
  }).then(res => {
    context.setLoading(false);
    return res;
  }).catch(e => {
    console.error(e);
    context.setLoading(false);
    context.setError(e.message);
    return e;
  })
}

export const addLike = async (movie, context) => {
  return await fetch('http://api.oikolesnikov.domain.nomoreparties.co:81/movies', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
    body: JSON.stringify(
      {
        country: movie.country,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
  }).then(async res => {
    if (res.statusText !== 'OK' && res.status !== 401) {
      throw await res.json();
    } else if (res.status === 401) {
      localStorage.clear();
      throw 401
    } else {
      return await res.json();
    }
  }).then(res => {
    context.setLoading(false);
    return res;
  }).catch(e => {
    console.error(e);
    context.setLoading(false);
    context.setError(e.message);
    return e;
  })
}

export const deleteLiked = async (id, context) => {

  return await fetch(`http://api.oikolesnikov.domain.nomoreparties.co:81/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  }).then(async res => {
    if (res.statusText !== 'OK' && res.status !== 401) {
      throw await res.json();
    } else if (res.status === 401) {
      localStorage.clear();
      throw 401
    } else {
      return await res.json();
    }
  }).then(res => {
    context.setLoading(false);
    return res;
  }).catch(e => {
    console.error(e);
    context.setLoading(false);
    context.setError(e.message);
    return e;
  })
}
