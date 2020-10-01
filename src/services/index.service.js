import axios from 'axios'
import standardHeaders from './standard.headers'
import ApiRoutes from '@/api/apiRoutes'

class IndexService {
  getIndexList () {
    const query = `query {
      indexes {
        indexes {
          indexId,
          indexType,
          dataSource,
          region,
          status,
          createdAt,
          updatedAt
        }
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.GraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }
}

export default new IndexService()
