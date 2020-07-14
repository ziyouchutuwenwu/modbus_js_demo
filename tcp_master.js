function main() {
  var ModbusRTU = require("modbus-serial");
  var modbusTCP = new ModbusRTU();

  modbusTCP
    .connectTCP("192.168.88.148", { port: 502 })
    .then(function () {
      info = "Connected, wait for reading...";
      console.log(info);


      modbusTCP.setID(1);

      // 从0号地址写入11 22 33 44 55
      // modbusRTU.writeRegisters(0, [11, 22, 33, 44, 55]).then(readModbusData);
      modbusTCP
        .writeRegisters(0, [111, 222, 333, 444, 555])
        .then(readModbusData);
    })
    .catch(function (e) {
      console.log("exception on connect");
    });

  var readModbusData = function () {
    modbusTCP
      .readHoldingRegisters(0, 5)
      .then(function (data) {
        mbsStatus = "success";
        console.log(data.buffer);
        modbusTCP.close();
      })
      .catch(function (e) {
        console.log("exception on reading, ", e);
      });
  };
}

exports.demo = main;
