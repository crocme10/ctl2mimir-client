const ApiBaseUrl = 'http://' + process.env.VUE_APP_BASE_HOST + ':' + process.env.VUE_APP_BASE_PORT

const ApiRoutes = {
  MimirGraphQL: ApiBaseUrl + process.env.VUE_APP_MIMIR_QUERY + '/graphql'
}

export default ApiRoutes
