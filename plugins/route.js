export default ({ app, redirect, store }) => {
  app.router.beforeEach((to, from, next) => {
    next()
  })
}
