export default class Api {
  constructor({ adress, token }) {
    this.adress = adress,
      this.token = token
  }

  getInitialCards() {
    return fetch(`${this.adress}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  getUserData() {
    return fetch(`${this.adress}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  editProfile(data) {
    return fetch(`${this.adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`);
        }
      })
  }

  addNewCard(data) {
    return fetch(`${this.adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    }
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка при создании карты: ${res.status}`);
        }
      })
  }

  deleteCard(data) {
    return fetch(`${this.adress}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
        }
      })
  }

  addLike(data) {
    return fetch(`${this.adress}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка при установке "лайка": ${res.status}`);
        }
      })
  }

  deleteLike(data) {
    return fetch(`${this.adress}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка при удалении "лайка": ${res.status}`);
        }
      })
  }
}  