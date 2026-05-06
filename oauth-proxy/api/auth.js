export default function handler(req, res) {
  const { client_id, redirect_uri, state } = req.query
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=repo,user&state=${state}`
  res.redirect(302, githubAuthUrl)
}
