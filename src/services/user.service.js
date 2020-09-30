import axios from 'axios'
import authHeader from './auth-header'
import ApiRoutes from '@/api/apiRoutes'

class UserService {
  getPublicContent () {
    const query = `query {
      contentForAll {
        content
      }
    }`

    return axios({
      method: 'post',
      headers: authHeader(),
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }

  getUserContent () {
    const query = `query {
      contentForUser {
        content
      }
    }`

    return axios({
      method: 'post',
      headers: authHeader(),
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }

  getModeratorBoard () {
    return Promise.resolve({ data: 'this is moderator board' })
  }

  getAdminContent () {
    const query = `query {
      contentForAdmin {
        content
      }
    }`

    return axios({
      method: 'post',
      headers: authHeader(),
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }
}

export default new UserService()
