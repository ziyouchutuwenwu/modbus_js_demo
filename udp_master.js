var ModbusRTU = require("modbus-serial");
var modbusUDP = new ModbusRTU();
modbusUDP.isDebugEnabled = true;

const sender = require("./modbus_sender").bus;
var isReconnected = false;

function connect() {
  modbusUDP
    .connectTCP("192.168.88.148", { port: 502 })
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
  modbusUDP
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
  if (!modbusUDP.isOpen) {
    connect();
  } else {
    readDemo();
  }
}

function onConnected() {
  info = "Connected, wait for reading...";
  console.log(info);

  if (!modbusUDP.isOpen) {
    console.log("client not opened, now will exit");
    modbusUDP.close();
  }

  modbusUDP.setID(1);
  setInterval(onLoopRead, 1000);

  sender.emit("write_regs", modbusUDP, 1, [11, 22, 33]);
}

module.exports = {
  demo: connect,
};