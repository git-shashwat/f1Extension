const axios = require("axios");
const ws = require("ws");

async function connectwss(token, cookie) {
  const hub = encodeURIComponent(JSON.stringify([{ name: "Streaming" }]));
  console.log({ hub });
  const encodedToken = encodeURIComponent(token);
  const url = `wss://livetiming.formula1.com/signalr/connect/?clientProtocol=1.5&transport=webSockets&connectionToken=${encodedToken}&connectionData=%5B%7B%22name%22%3A%22Streaming%22%7D%5D&EIO=4`;
  console.log({ url });
  const p = new Promise((res, rej) => {
    const sock = new ws.WebSocket(url, {
      headers: {
        "User-Agent": "BestHTTP",
        "Accept-Encoding": "gzip,identity",
        Cookie: cookie,
      },
    });

    sock.on("open", (ev) => {
      res(sock);
    });
    sock.on("message", (data) => {
      console.log("received %s", data);
    });
  });
  return p;
}

async function negotiate() {
  const hub = encodeURIComponent(JSON.stringify([{ name: "Streaming" }]));
  const url = `https://livetiming.formula1.com/signalr/negotiate?connectionData=${hub}&clientProtocol=1.5`;
  const resp = await axios.get(url);
  return resp;
}

async function main() {
  try {
    const resp = await negotiate();
    console.log(resp.data);
    console.log(resp.headers);

    const sock = await connectwss(
      resp.data["ConnectionToken"],
      resp.headers["set-cookie"]
    );

    sock.send(
      JSON.stringify({
        H: "Streaming",
        M: "Subscribe",
        A: [["DriverList"]],
        I: 1,
      })
    );
  } catch (e) {
    console.error(e);
  }
}

main();
