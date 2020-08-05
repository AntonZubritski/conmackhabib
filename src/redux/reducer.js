import * as constants from './constants'

const initialStateRegister = {
  banner: false,
  checkLog: false,
  email: '',
  password: '',
  username: '',
  bio: '',
  image: '',
}

const initialStateHome = {
  articles: {
    articles: null,
    articlesCount: null,
  },
  articlesApi: 'globalfeed',
  tags: false,
  idPagination: '1',
  error: null,
}

const initialStateProfile = {
  profile: {
    username: null,
    bio: null,
    image: null,
    folowing: null,
  },
  article: {
    author: {
      username: null,
      bio: null,
      image: null,
      folowing: null,
    },
    body: '',
    createdAt: null,
    description: '',
    favorited: null,
    favoritesCount: null,
    slug: null,
    tagList: [],
    title: '',
    updatedAt: null,
  },
  edit: false,
  tag: '',
  comments: [],
  textComment: '',
}

const registerReducer = (state = initialStateRegister, action) => {
  switch (action.type) {
    case constants.SET_AUTH:
      return { ...state, [action.name]: action.payload }
    case constants.DELETE_USER_INFO:
      return initialStateRegister
    case constants.SAVE_USER_INFO:
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        image: action.payload.user.image,
        bio: action.payload.user.bio,
        createdAt: action.payload.user.createdAt,
        updatedAt: action.payload.user.updatedAt,
        token: action.payload.user.token,
        checkLog: true,
      }
    default:
      return state
  }
}

const homeReducer = (state = initialStateHome, action) => {
  switch (action.type) {
    case constants.UPDATE_ARTICLES:
      return { ...state, articles: action.payload, articlesApi: action.text }
    case constants.DELETE_ARTICLES:
      return {
        ...state,
        articles: { ...state.aricles, articles: null, articlesCount: null },
      }
    case constants.UPDATE_ARTICLES_API:
      return { ...state, articlesApi: action.payload }
    case constants.UPDATE_ID_PAGINATION:
      return { ...state, idPagination: action.payload }
    case constants.SET_TAGS:
      return { ...state, tags: action.payload }
    case constants.ADD_ARTICLES_ERROR:
      return { ...state, error: action.payload }
    case constants.CLEAN_ERROR:
      return { ...state, error: null }

    default:
      return state
  }
}
const profileReducer = (state = initialStateProfile, action) => {
  switch (action.type) {
    case constants.SAVE_USER_PROFILE:
      return {
        ...state,
        article: { ...state.article, author: action.payload.profile },
      }
    case constants.SET_NEW_ARTICLE:
      return {
        ...state,
        article: { ...state.article, [action.name]: action.payload },
      }
    case constants.CLEAN_FORM_NEW_ARTICLE:
      return {
        ...state,
        article: {
          ...state.article,
          body: '',
          description: '',
          slug: null,
          tagList: [],
          title: '',
        },
        edit: false,
      }
    case constants.SET_AUTH_TAG:
      return { ...state, tag: action.payload }
    case constants.GET_ARTICLE_INFO:
      return { ...state, article: action.payload.article }
    case constants.GET_COMMENTS:
      return { ...state, comments: action.payload.comments, bounce: null }
    case constants.DEL_COMMENTS:
      return { ...state, comments: action.payload }
    case constants.SET_COMMENT:
      return { ...state, textComment: action.payload }
    case constants.SET_TAG:
      return {
        ...state,
        article: { ...state.article, tagList: action.payload },
        tag: '',
      }
    case constants.EDIT_MODE:
      return { ...state, edit: true }
    default:
      return state
  }
}

export { registerReducer, homeReducer, profileReducer }
