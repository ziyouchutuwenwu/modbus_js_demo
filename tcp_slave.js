var ModbusTcpServer = require("nodbus-plus").ModbusTcpServer;
var slave = new ModbusTcpServer(8502);

slave.on("error", function (err) {
  console.log(err);
});

slave.on("connection", function (socket) {
  console.log("connection");
});

slave.on("connection-closed", function (socket) {
  console.log("connection-closed " + socket.remoteAddress + " disconnected");
});

slave.on("client-disconnect", function (socket) {
  console.log("client-disconnect " + socket.remoteAddress + " disconnected");
});

slave.on("listening", function (port) {
  console.log("listening ", port);
});

slave.on("closed", function () {
  console.log("server closed");
});

// 收到指令
slave.on("indication", function (adubuffer) {
  console.log("Indication Recieved");
  console.log(adubuffer);
});

// 收到数据
slave.on("values", function (reference, address) {
  console.log(
    "data write on: " + (reference == "0x" ? "coils" : "holding registers")
  );
  address.forEach(function (value, key) {
    console.log(key + ": " + value);
  });
});

slave.on("response", function (resp) {
  // data = slave.GetData(1, 4);
  console.log("response", resp);
  // data = slave.holdingRegisters;
  // console.log("holdingRegisters", data);

  // slave.SetData(1, "holding", 2);
});

slave.on("modbus_exeption", function (reason) {
  console.log("modbus_exeption, reason ", reason);
});

function start() {
  slave.Start();
}

module.exports = {
  demo: start,
};
