export default class Api {
  constructor({baseUrl,headers}) {
    this._baseUrl =  baseUrl;
    this._headers = headers;
  }
getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
  headers: this._headers,

})
  .then(this._handleResponse)
}

setUserInfo(data) {
  console.log(data);
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data['user-name'],
      about: data.description
    })
  }).then(this._handleResponse)
}


getCardsInfo() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
  })
    .then(this._handleResponse)
}


addCard(data) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(this._handleResponse)
}

deleteCard(data) {
  return fetch(`${this._baseUrl}/cards/${data._id}`, {
    method: 'DELETE',
    headers: this._headers
  }).then(this._handleResponse)
}

likeCard(data){
  return fetch(`${this._baseUrl}/cards/likes/cardId`, {
    method: 'PUT',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(this._handleResponse)
}

_handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
}



  // другие методы работы с API
}
