import axios from 'axios'
import ApiRoutes from '@/api/apiRoutes'

class AuthService {
  login (user) {
    const variables = {
      credentials: {
        username: user.username,
        password: user.password
      }
    }

    const query = `mutation loginUser($credentials: CredentialsRequestBody!) {
      loginUser(credentials: $credentials) {
        user {
          id,
          username,
          email,
          roles
        },
        token
      }
    }`

    return axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query,
        variables: variables
      })
    }).then(response => {
      if (response.data.data.loginUser) {
        localStorage.setItem('user', JSON.stringify(response.data.data.loginUser))
        return response.data.data.loginUser
      } else {
        // TODO
        return response.data
      }
    })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    const variables = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    }

    const query = `mutation registerUser($user: UserRequestBody!) {
      registerUser(user: $user) {
        user {
          id,
          username,
          email,
          active,
          createdAt,
          updatedAt
        }
      }
    }`

    return axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query,
        variables: variables
      })
    })
  }
}

export default new AuthService()
