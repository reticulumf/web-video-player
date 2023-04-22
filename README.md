# Video player

This is a simple video player.

## Use cases

This player should be used in local networks if you have videos downloaded on your PC and you want to see them from different devices in your local network. For example a phone, TV, PR, or Xbox.

You have to run this server on your device where you have videos. This device has to support Node.js. Not sure which version is required but a relatively new one should work ok!

## Using

1. Clone the repo and `cd` to it.
2. Install Node.js packages: `npm ci`
3. Start the server with the videos directory as an argument: `node server.js "F:\videos"`
4. Check your device local IP address: `ipconfig`
5. In the browser go to the IP address obtained in the previous step specifying port 3000 like this `http://192.168.0.104:3000/`
6. Enjoy your videos even without access to the internet.

## PS

1. Please note that not all the codecs are supported by the browsers and don't be surprised if the video doesn't work. =)
2. And of course you can use it on your computer and expose this server to the internet and use it wherever you want, but I'm too lazy for giving you a tutorial. Use this program freely!