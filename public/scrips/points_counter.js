async function get_score() {
  let require_score = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //lo que yo le paso yo
      userID: "ID",
      nom: "nombre",
      pointRound: "puntos",
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });

  return require_score;
}
