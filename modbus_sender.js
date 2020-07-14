var nanobus = require("nanobus");
var bus = nanobus();

bus.on("write_reg", function (modbus, regAddr, dataByte) {
  if (modbus.isOpen) {
    modbus.writeRegister(regAddr, dataByte);
    console.log("write_reg, addr %d, dataByte", regAddr, dataByte);
  }
});

bus.on("write_regs", function (modbus, regAddr, dataArray) {
  if (modbus.isOpen) {
    modbus.writeRegisters(regAddr, dataArray);
    console.log("write_regs, addr %d, dataArray", regAddr, dataArray);
  }
});

bus.on("write_coil", function (modbus, regAddr, dataByte) {
  if (modbus.isOpen) {
    modbus.writeRegister(regAddr, dataByte);
    console.log("write_coil, addr %d, dataByte", regAddr, dataByte);
  }
});

bus.on("write_coils", function (modbus, regAddr, statusArray) {
  if (modbus.isOpen) {
    modbus.writeCoils(regAddr, statusArray);
    console.log("write_coils, addr %d, statusArray", regAddr, statusArray);
  }
});

module.exports = {
  bus,
};

// const sender = require("./modbus_sender").bus;
// sender.emit("write_coils", modbusTCP, 1, [11, 22, 33]);
