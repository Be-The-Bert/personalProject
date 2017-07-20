export default {
  mainRedirect: (push, loggedin) => {
    if (!loggedin) {
      return push('/welcome')
    }
  },
  welcomeRedirect: (push, loggedin) => {
    if (loggedin) {
      return push('/profile')
    }
  }
}