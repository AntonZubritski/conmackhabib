const headers = {
  'Content-Type': 'application/json',
}

export default class Login {
  _apiBase = `https://conduit.productionready.io/api`
  _apiArticles = `https://conduit.productionready.io/api/articles?limit=10&offset=0`
  _url = `/users/login`
  _urlReg = `/users`

  userReg = async (userReg) => {
    const res = await fetch(`${this._apiBase}${this._urlReg}`, {
      method: 'POST',
      body: JSON.stringify(userReg),
      headers: headers,
    })
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }
    return await res.json()
  }

  userLogin = async (userLog) => {
    const res = await fetch(`${this._apiBase}${this._url}`, {
      method: 'POST',
      body: JSON.stringify(userLog),
      headers: headers,
    })
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }
    return await res.json()
  }
}
