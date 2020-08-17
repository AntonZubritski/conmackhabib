import {
  SAVE_USER_INFO,
  UPDATE_ARTICLES,
  ADD_ARTICLES_ERROR,
  SET_TAGS,
  SET_AUTH,
  DELETE_USER_INFO,
  SAVE_USER_PROFILE,
  UPDATE_ARTICLES_API,
  SET_NEW_ARTICLE,
  GET_ARTICLE_INFO,
  GET_COMMENTS,
  DEL_COMMENTS,
  SET_COMMENT,
  DELETE_ARTICLES,
  EDIT_MODE,
  SET_TAG,
  SET_AUTH_TAG,
  CLEAN_FORM_NEW_ARTICLE,
  CLEAN_ERROR,
  REGISTER_ERROR
} from './constants'

import ApiArticles from '../services/api-services'
const api = new ApiArticles()

//REFRESH-GET ARTICLES
export const UpdateArticlesAsync = (
  tag,
  paginationId = 1,
  username
) => {
  return (dispatch) => {
    api.fetchApi
      .getArticles(tag, paginationId, username)
      .then((articles) => {
        dispatch(UpdateArticles(articles))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

// GET LIST TAGS
export const GetTagsApi = () => {
  return (dispatch) => {
    api.fetchApi
      .tags()
      .then((tags) => {
        dispatch(SetTags(tags.tags))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

// REGISTER USER/LOGIN USER
export const UpdateLogRegInfo = (userInfo, logUrl) => {
  return (dispatch) => {
    api.fetchApi
      .reglog(userInfo, logUrl)
      .then((recievedInfo) => {
        dispatch(SaveUserInfo(recievedInfo))
        localStorage.setItem('jwt', recievedInfo.user.token)
        api.setToken(recievedInfo.user.token)
      })
      .catch(() => {
        dispatch(AddRegErr())
      })
  }
}

//LOGIN TOKEN
export const UpdateLogToken = () => {
  return (dispatch) => {
    api.setToken()
    api.fetchApi
      .logToken()
      .then((recievedInfo) => {
        dispatch(SaveUserInfo(recievedInfo))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

//PUT INFO USER FORM
export const userPutSettings = (settingsInfo) => {
  return (dispatch) => {
    api.fetchApi
      .settings(settingsInfo)
      .then((recievedInfo) => {
        dispatch(SaveUserInfo(recievedInfo))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

//SET FAVORITE
export const SetUserFavorite = (
  userId,
  paginationId,
  tag,
  favorited,
  username
) => {
  return (dispatch) => {
    api.fetchApi
      .favorite(userId, favorited)
      .then(() => {
        api.fetchApi
          .getArticles(tag, paginationId, username)
          .then((articles) => {
            dispatch(UpdateArticles(articles))
          })
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

export const SetPostFavorite = (userId, favorited) => {
  return (dispatch) => {
    api.fetchApi
      .favorite(userId, favorited)
      .then((articleInfo) => {
        dispatch(GetArticleInfo(articleInfo))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

//GET INFO PROFILE & FOLLOWING
export const GetProfileInfo = (username, following) => {
  return (dispatch) => {
    api.fetchApi
      .getProfile(username, following)
      .then((profileInfo) => {
        dispatch(SaveUserProfile(profileInfo))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

//DELETE INFO,TOKEN & EXIT
export const DeleteUserInfo = () => {
  api.setToken(null)
  localStorage.clear('jwt')
  return {
    type: DELETE_USER_INFO,
  }
}

//SET NEW ARTICLE
export const PostNewArticle = (objArticleInfo) => {
  return (dispatch) => {
    api.fetchApi.SetArticles(objArticleInfo).catch((err) => {
      dispatch(AddArticlesErr(err.message))
    })
  }
}

export const PutEditArticle = (objArticleInfo, slug) => {
  return (dispatch) => {
    api.fetchApi.putEditArticles(objArticleInfo, slug).catch((err) => {
      dispatch(AddArticlesErr(err.message))
    })
  }
}

export const DeleteArticle = (slug) => {
  return (dispatch) => {
    api.fetchApi.deleteArticles(slug).catch((err) => {
      dispatch(AddArticlesErr(err.message))
    })
  }
}
//GET PROFILE(READ MORE)
export const GetReadMoreArticle = (articleId) => {
  return (dispatch) => {
    api.fetchApi
      .getArticle(articleId)
      .then((articleInfo) => {
        dispatch(GetArticleInfo(articleInfo))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
    api.fetchApi
      .getComments(articleId)
      .then((comments) => {
        dispatch(GetComments(comments))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}
export const PostComment = (articleId, comment) => {
  return (dispatch) => {
    api.fetchApi
      .postComment(articleId, comment)
      .then(() =>
        api.fetchApi
          .getComments(articleId)
          .then((comments) => {
            dispatch(GetComments(comments))
            dispatch(UpdateFieldComment(''))
          })
          .catch((err) => {
            dispatch(AddArticlesErr(err.message))
          })
      )
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}
export const DeleteComment = (articleId, id, newComments) => {
  return (dispatch) => {
    api.fetchApi
      .deleteComment(articleId, id)
      .then(() => dispatch(DelComments(newComments)))
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

export const GetComment = (articleId) => {
  return (dispatch) => {
    api.fetchApi
      .getComments(articleId)
      .then((comments) => {
        dispatch(GetComments(comments))
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

export const EditMode = () => ({ type: EDIT_MODE })
export const SetTag = (payload) => ({ type: SET_TAG, payload })
export const GetArticleInfo = (payload) => ({ type: GET_ARTICLE_INFO, payload })
export const GetComments = (payload) => ({ type: GET_COMMENTS, payload })
export const DelComments = (payload) => ({ type: DEL_COMMENTS, payload })
export const DelArticles = () => ({ type: DELETE_ARTICLES })
export const SetPostArticle = (name, payload) => ({
  type: SET_NEW_ARTICLE,
  payload,
  name,
})
export const SaveUserInfo = (payload) => ({ 
  type: SAVE_USER_INFO, 
  payload 
})
export const SaveUserProfile = (payload) => ({
  type: SAVE_USER_PROFILE,
  payload,
})
export const UpdateArticles = (payload) => ({
  type: UPDATE_ARTICLES,
  payload
})
export const UpdateArticlesApi = (payload) => ({
  type: UPDATE_ARTICLES_API,
  payload,
})
export const AddArticlesErr = (payload) => ({
  type: ADD_ARTICLES_ERROR,
  payload,
})
export const AddRegErr = () => ({
  type: REGISTER_ERROR,
})

export const SetTags = (payload) => ({ type: SET_TAGS, payload })
export const UpdateFieldAuth = (name, payload) => ({
  type: SET_AUTH,
  payload,
  name,
})
export const handleChangeTag = (payload) => ({ type: SET_AUTH_TAG, payload })
export const UpdateFieldComment = (payload) => ({ type: SET_COMMENT, payload })
export const CleanNewArticlePage = () => ({ type: CLEAN_FORM_NEW_ARTICLE })
export const CleanError = () => ({ type: CLEAN_ERROR })
