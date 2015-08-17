var serialport = require('serialport');
var portName = 'COM4';  // change to your port.

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

var readData = '';  // this stores the buffer
var temp ='';
var humi ='';
var dht11data =[]; // this array stores date and data of temp, humi.

sp.on('data', function (data) { // call back when data is received
    readData += data.toString(); // append data to buffer
 
    if (readData.lastIndexOf(':') >= 20 && readData.indexOf(':') >= 0) {
        temp = readData.substring(readData.indexOf(':') + 1, readData.indexOf(','));
        humi = readData.substring(readData.lastIndexOf(':') + 1);
        readData = '';
        
        dStr = getDateString();
        dht11data[0]=dStr;  // Date
        dht11data[1]=temp;  // temperature data
        dht11data[2]=humi;  // humidity data
        console.log(dht11data);
        io.sockets.emit('message', dht11data);  // send data to all clients 

    } else {  // error 
        console.log(readData);
    }
    
});

// helper function to get a nicely formatted date string
function getDateString() {
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Korea, GimHae)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time +32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
