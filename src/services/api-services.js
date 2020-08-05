export default class ApiServices {
  _urlBase = 'https://conduit.productionready.io/api'
  _dfaultImg = 'https://static.productionready.io/images/smiley-cyrus.jpg'
  _token = null
  setToken = () => (this._token = window.localStorage.getItem('jwt'))
  offset = (pagId) => `limit=10&offset=${(pagId - 1) * 10}`
  headers = (token) => {
    return {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    }
  }

  //-------------Template for fetchApi
  templateFetch = async (url, method, body) => {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: this.headers(this._token),
    })
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }
    return res.json()
  }
  templateArticlesFetch = async (url) => {
    const res = await this.templateFetch(url, 'GET')
    return {
      articles: res.articles.map(this._transformArticles),
      articlesCount: this._transformCount(res.articlesCount),
    }
  }
  //-------------Template for fetchApi END
  fetchApi = {
    favorite: (userId, favorited) =>
      this.templateFetch(
        `${this._urlBase}/articles/${userId}/favorite`,
        favorited ? 'DELETE' : 'POST'
      ),
    reglog: (userLog, logUrl) =>
      this.templateFetch(`${this._urlBase}/users/${logUrl}`, 'POST', userLog),
    logToken: () => this.templateFetch(`${this._urlBase}/user`, 'GET'),
    settings: (userInfo) =>
      this.templateFetch(`${this._urlBase}/user`, 'PUT', userInfo),
    tags: () => this.templateFetch(`${this._urlBase}/tags`, 'GET'),
    SetArticles: (articlesInfo) =>
      this.templateFetch(`${this._urlBase}/articles`, 'POST', articlesInfo),
    putEditArticles: (articlesInfo, slug) =>
      this.templateFetch(
        `${this._urlBase}/articles/${slug}`,
        'PUT',
        articlesInfo
      ),
    deleteArticles: (slug) =>
      this.templateFetch(`${this._urlBase}/articles/${slug}`, 'DELETE'),
    getArticles: (tag, pagId, username) => {
      switch (tag) {
        case 'globalfeed':
          return this.templateArticlesFetch(
            `${this._urlBase}/articles?${this.offset(pagId)}`,
            'GET'
          )
        case 'yourfeed':
          return this.templateArticlesFetch(
            `${this._urlBase}/articles/feed?${this.offset(pagId)}`,
            'GET'
          )
        case 'mypost':
          return this.templateArticlesFetch(
            `${this._urlBase}/articles?author=${username}&${this.offset(
              pagId
            )}`,
            'GET'
          )
        case 'favor':
          return this.templateArticlesFetch(
            `${this._urlBase}/articles?favorited=${username}&${this.offset(
              pagId
            )}`,
            'GET'
          )
        default:
          return this.templateArticlesFetch(
            `${this._urlBase}/articles?tag=${tag}&${this.offset(pagId)}`,
            'GET'
          )
      }
    },
    getProfile: (username, following) => {
      switch (typeof following) {
        case 'boolean':
          return this.templateFetch(
            `${this._urlBase}/profiles/${username}/follow`,
            following ? 'DELETE' : 'POST'
          )
        default:
          return this.templateFetch(
            `${this._urlBase}/profiles/${username}`,
            'GET'
          )
      }
    },
    getArticle: (postId) =>
      this.templateFetch(`${this._urlBase}/articles/${postId}`, 'GET'),
    getComments: (postId) =>
      this.templateFetch(`${this._urlBase}/articles/${postId}/comments`, 'GET'),
    postComment: (postId, comment) =>
      this.templateFetch(
        `${this._urlBase}/articles/${postId}/comments`,
        'POST',
        comment
      ),
    deleteComment: (postId, id) =>
      this.templateFetch(
        `${this._urlBase}/articles/${postId}/comments/${id}`,
        'DELETE'
      ),
  }

  //------Transform Function
  _transformArticles = (articles) => {
    return {
      title: articles.title,
      userName: articles.author.username,
      userId: articles.slug,
      image:
        articles.author.image === '' || articles.author.image === undefined
          ? this._defaultImg
          : articles.author.image,
      body: articles.body,
      description: articles.description,
      created: this._transformDate(articles.createdAt),
      tags: articles.tagList,
      following: articles.following,
      favorited: articles.favorited,
      favoritesCount: articles.favoritesCount,
    }
  }

  _transformDate = (created) => {
    const day = new Date(created).getDate()
    const month = new Date(created).toLocaleString('en', { month: 'long' })
    const year = new Date(created).getFullYear()
    return `${month} ${day}, ${year}`
  }
  _transformCount = (articlesCount) => {
    const arr = []
    for (let a = 1; a <= Math.ceil(articlesCount / 10); a++) {
      arr.push(a)
    }
    return arr
  }
  //------Transform Function END
}
