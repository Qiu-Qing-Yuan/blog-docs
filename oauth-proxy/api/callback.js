export default async function handler(req, res) {
  const { code, state } = req.query

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' })
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error })
    }

    const html = `
<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    console.log("receiveMessage", e);
    window.opener.postMessage(
      'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
      e.origin
    );
    window.close();
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
