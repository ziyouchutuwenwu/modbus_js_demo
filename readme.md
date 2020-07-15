# js 的 modbus 例子

具体见例子

## 打印完全的输入输出

- 8.0.1 版以后，出来的可以看到原始数据
- <https://github.com/yaacov/node-modbus-serial/pull/349>
- <https://github.com/yaacov/node-modbus-serial/issues/344>

## 依赖库

```bash
模拟主站
npm install node-modbus-serial

类似eventbus的库
npm install nanobus

模拟从站, 暂时只支持tcp，udp和串口不支持
npm install nodbus-plus
```
