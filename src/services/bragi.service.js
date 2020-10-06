import axios from 'axios'
import standardHeaders from './standard.headers'
import ApiRoutes from '@/api/apiRoutes'

class BragiService {
  getStatus () {
    const query = `query {
      status {
        info {
          label,
          url,
          version,
          status,
          updatedAt,
          elastic {
            label,
            url,
            name,
            status,
            version,
            indices {
              label,
              placeType,
              coverage,
              count,
              updatedAt
            }
          }
        }
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.StatusGraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }

  search (payload) {
    const variables = {
      request: {
        parameters: {
          query: payload.query
        }
      }
    }

    const query = `query autocomplete($request:AutocompleteRequestBody!) {
      autocomplete(request:$request) {
        resp
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.BragiGraphQL,
      data: JSON.stringify({
        query: query,
        variables: variables
      })
    })
  }
}

export default new BragiService()
