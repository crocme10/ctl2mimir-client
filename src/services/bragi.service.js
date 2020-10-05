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
}

export default new BragiService()
