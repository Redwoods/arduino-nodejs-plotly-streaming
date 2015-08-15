var serialport = require('serialport');
var portName = 'COM4';  // change portName to that of your current port

var io = require('socket.io').listen(8000); // server listens for socket.io communication at port 8000


var sp = new serialport.SerialPort(portName,{
    baudRate: 9600,   // 9600  38400
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

io.sockets.on('connection', function (socket) {
    // If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});

var dStr ='';  // this stores the data-time string
var tdata =[]; // this array stores [dStr, PPG signal]

sp.on('data', function (data) { // call back when data is received
 
        dStr = getDateString();
        tdata[0]=dStr;  // Date
        tdata[1]=data;  // data
        console.log(tdata);
        io.sockets.emit('message', tdata);  // send data to all clients   
});


// helper function to get a nicely formatted date string (plotly)
function getDateString() {
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Korea, GimHae)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time +32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
