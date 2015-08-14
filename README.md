# arduino-nodejs-plotly-streaming
This repo introduces a simple and efficient way to plot the streaming data from Easy Pulse ppg sensor wired with Arduino.
In the server side with node.js, data generated through serial port flow into the client side via server socket.
In the client side, the streaming data are continuously received using client socket. By using plotly-basic.js we can easily plot the streaming data in real-time.

## The three steps to realtime plotly streaming
- Arduino code and upload
- Node server code with modules; serialport, socket.io
- Client html with plotly-basic.js and socket.io.js

## [1] Arduino code

## [2] Node server code

## [3] Client html