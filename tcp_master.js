var ModbusRTU = require("modbus-serial");
var modbusTCP = new ModbusRTU();
modbusTCP.isDebugEnabled = true;

function connect() {
  modbusTCP
    .connectTCP("192.168.88.148", { port: 502 })
    .then(function () {
      onConnected();
    })
    .catch(function (e) {
      console.log("connect failed");
    });
}

function readDemo() {
  modbusTCP
    .readHoldingRegisters(0, 5)
    .then(function (data) {
      mbsStatus = "success";
      console.log(data);
    })
    .catch(function (e) {
      console.log("exception on reading, ", e);
    });
}

function onLoopRead() {
  if (!modbusTCP.isOpen) {
    console.log("client not opened");
    connect();
  } else {
    // readDemo();
  }
}

function onLoopWrite() {
  if (modbusTCP.isOpen) {
    // 从0号地址写入11 22 33 44 55
    // modbusTCP.writeRegisters(0, [11, 22, 33, 44, 55]).then(readData);
    // modbusTCP.writeRegisters(0, [11, 22, 33, 44, 66]);

    // 批量写线圈
    // modbusTCP.writeCoils(0, [true, false, true, true]);
    // 单个写线圈
    // modbusTCP.writeCoil(1, true);

    // holding regs
    // modbusTCP.writeRegisters(2, [10, 9, 8, 11, 33]);

    modbusTCP.writeRegisters(1, [100, 90, 80, 11, 22]);

    console.log("data sent");
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
  setInterval(onLoopWrite, 10000);
}

exports.demo = connect;
