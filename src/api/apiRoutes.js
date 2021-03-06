function getBragiBaseUrl () {
  if (process.env.VUE_APP_BRAGI_HOST) {
    return 'http://' + process.env.VUE_APP_BRAGI_HOST + ':' + process.env.VUE_APP_BRAGI_PORT
  } else {
    return ''
  }
}

function getMimirBaseUrl () {
  if (process.env.VUE_APP_MIMIR_HOST) {
    return 'http://' + process.env.VUE_APP_MIMIR_HOST + ':' + process.env.VUE_APP_MIMIR_PORT
  } else {
    return ''
  }
}

function getStatusBaseUrl () {
  if (process.env.VUE_APP_STATUS_HOST) {
    return 'http://' + process.env.VUE_APP_STATUS_HOST + ':' + process.env.VUE_APP_STATUS_PORT
  } else {
    return ''
  }
}

const ApiRoutes = {
  MimirGraphQL: getMimirBaseUrl() + process.env.VUE_APP_MIMIR_QUERY + '/graphql',
  StatusGraphQL: getStatusBaseUrl() + process.env.VUE_APP_STATUS_QUERY + '/graphql',
  BragiGraphQL: getBragiBaseUrl() + process.env.VUE_APP_BRAGI_QUERY + '/graphql'
}

export default ApiRoutes
