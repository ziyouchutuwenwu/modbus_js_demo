function main() {
  var ModbusRTU = require("modbus-serial");
  var modbusUDP = new ModbusRTU();
  modbusUDP.isDebugEnabled = true;

  modbusUDP
    .connectUDP("192.168.88.148", { port: 502 })
    .then(function () {
      info = "Connected, wait for reading...";
      console.log(info);

      if (!modbusUDP.isOpen) {
        console.log("client not opened, now close");
        modbusUDP.close();
      }

      modbusUDP.setID(1);

      // 从0号地址写入11 22 33 44 55
      // modbusRTU.writeRegisters(0, [11, 22, 33, 44, 55]).then(readModbusData);
      modbusUDP
        .writeRegisters(0, [333, 444, 555, 111, 222])
        .then(readModbusData);
    })
    .catch(function (e) {
      console.log("exception on connect");
    });

  var readModbusData = function () {
    modbusUDP
      .readHoldingRegisters(0, 5)
      .then(function (data) {
        mbsStatus = "success";
        console.log(data);
        modbusUDP.close();
      })
      .catch(function (e) {
        console.log("exception on reading, ", e);
      });
  };
}

exports.demo = main;
