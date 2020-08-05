export default class SwapiService {
  _apiBase =
    'https://conduit.productionready.io/api/articles?limit=10&amp;offset=0.'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`)
    return res.results.map(this._transformPerson)
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`)
    return this._transformPerson(person)
  }

  async getAllPlanet() {
    const res = await this.getResource(`/planets/`)
    return res.results.map(this._transformPerson)
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`)
    return this._transformPlanet(planet)
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/
    return item.url.match(idRegExp)[1]
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`)
    return res.results.map(this._transformPerson)
  }

  async getStarships(id) {
    const person = await this.getResource(`/starships/${id}/`)
    return this._transformPerson(person)
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
    }
  }
}
