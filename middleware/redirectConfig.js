export default function ({ params, query, redirect }) {
  console.log('query', query)
  console.log('params', params)
  if (params.type === 'WEIBO' && query.error === 'access_denied') {
    redirect(`/`)
    return
  }
  redirect(`/?type=${params.type}&code=${query.code}`)
}
