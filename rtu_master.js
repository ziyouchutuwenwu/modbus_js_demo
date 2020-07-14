var ModbusRTU = require("modbus-serial");
var modbusRTU = new ModbusRTU();
modbusRTU.isDebugEnabled = true;

const sender = require("./modbus_sender").bus;
var isReconnected = false;

function connect() {
  modbusRTU
    .connectRTUBuffered("/dev/ttyUSB0", {
      baudRate: 9600,
      parity: "even",
      dataBits: 8,
      stopBits: 1,
    })
    .then(function () {
      if (!isReconnected) {
        isReconnected = true;
        onConnected();
      }
    })
    .catch(function (e) {
      console.log("connect failed");
    });
}

function readDemo() {
  modbusRTU
    .readHoldingRegisters(0, 10)
    .then(function (data) {
      mbsStatus = "success";
      console.log("readHoldingRegisters", data);
    })
    .catch(function (e) {
      console.log("readHoldingRegisters error, ", e);
    });
}

function onLoopRead() {
  if (!modbusRTU.isOpen) {
    connect();
  } else {
    readDemo();
  }
}

function onConnected() {
  info = "Connected, wait for reading...";
  console.log(info);

  if (!modbusRTU.isOpen) {
    console.log("client not opened, now will exit");
    modbusRTU.close();
  }

  modbusRTU.setID(1);
  setInterval(onLoopRead, 1000);

  sender.emit("write_regs", modbusRTU, 1, [11, 22, 33]);
}

exports.demo = connect;
