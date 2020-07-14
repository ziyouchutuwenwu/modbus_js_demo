function main() {
  var ModbusRTU = require("modbus-serial");
  var modbusRTU = new ModbusRTU();
  modbusRTU.isDebugEnabled = true;

  modbusRTU
    .connectRTUBuffered("/dev/ttyUSB0", {
      baudRate: 9600,
      parity: "even",
      dataBits: 8,
      stopBits: 1,
    })
    .then(function () {
      info = "Connected, wait for reading...";
      console.log(info);

      if (!modbusRTU.isOpen) {
        console.log("client not opened, now close");
        modbusRTU.close();
      }

      modbusRTU.setID(1);

      // 从0号地址写入11 22 33 44 55
      // modbusRTU.writeRegisters(0, [11, 22, 33, 44, 55]).then(readModbusData);
      modbusRTU
        .writeRegisters(0, [111, 222, 333, 444, 555])
        .then(readModbusData);
    })
    .catch(function (e) {
      console.log("exception on connect");
    });

  var readModbusData = function () {
    modbusRTU
      .readHoldingRegisters(0, 5)
      .then(function (data) {
        mbsStatus = "success";
        console.log(data);
        modbusRTU.close();
      })
      .catch(function (e) {
        console.log("exception on reading, ", e);
      });
  };
}

exports.demo = main;
