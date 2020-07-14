var ModbusRTU = require("modbus-serial");
var modbusTCP = new ModbusRTU();
modbusTCP.isDebugEnabled = true;

const sender = require("./modbus_sender").bus;
var isReconnected = false;

function connect() {
  modbusTCP
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
  modbusTCP
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
  if (!modbusTCP.isOpen) {
    connect();
  } else {
    readDemo();
  }
}

function onConnected() {
  info = "Connected, wait for reading...";
  console.log(info);

  if (!modbusTCP.isOpen) {
    console.log("client not opened, now will exit");
    modbusTCP.close();
  }

  modbusTCP.setID(1);
  setInterval(onLoopRead, 1000);

  sender.emit("write_regs", modbusTCP, 1, [11, 22, 33]);
}

module.exports = {
  demo: connect,
};