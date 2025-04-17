
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    headers: {
      authorization: 'b39de8ea-6873-4606-b10b-695abf431d72',
      'Content-Type': 'application/json'
    }
};
  
const sendRequest = (method, url, body = {}) => {
    const options = {
        method,
        headers: config.headers
    };

    if (body && Object.keys(body).length > 0) {
        options['body'] = JSON.stringify(body);
    };

    return fetch(`${config.baseUrl}${url}`, options)
    .then((res) => {
        
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
};

export const requestAPI =  {
    addCard({name, link}) {
        return sendRequest('POST', '/cards', {name, link});
    },
    getProfile() {
        return sendRequest('GET', '/users/me');
    },
    getCards() {
        return sendRequest('GET', '/cards');
    },
    deleteCard(cardId) {
        return sendRequest('DELETE', `/cards/${cardId}`);
    },
    likeCard(cardId) {
        return sendRequest('PUT', `/cards/likes/${cardId}`);
    },
    deleteLike(cardId) {
        return sendRequest('DELETE', `/cards/likes/${cardId}`);
    },
    setProfile({name, about}) {
        return sendRequest('PATCH', '/users/me', {name, about});
    },
    setAvatar(avatar) {
        return sendRequest('PATCH', '/users/me/avatar', avatar);
    }
}