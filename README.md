# arduino-nodejs-plotly-streaming
This repo introduces a simple and efficient way to plot the streaming data from Easy Pulse ppg sensor wired with Arduino.
In the server side with node.js, data generated through serial port flow into the client side via server socket.
In the client side, the streaming data are continuously received using client socket. By using plotly-basic.js we can easily plot
the streaming data in real-time.
