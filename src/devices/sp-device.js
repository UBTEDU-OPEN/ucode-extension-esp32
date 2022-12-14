import { CommonProtocols, ExtensionUI } from '@ubtech/ucode-extension-common-sdk';

const { Toast } = ExtensionUI;
const { SerialPortProtocol, getSerialPortDeviceRegister } = CommonProtocols.SerialPort;

const lineStart = '>>> '; // micropython repl每次启动或运行代码完成后，会以这个开头，这里简单地将此字符串作为数据分包符

class ESP32SerialportConnection extends SerialPortProtocol {
  constructor(injectArgs) {
    super(injectArgs);
    this.dataDisposable = this.onData(this.onMessage.bind(this));
    this.message = ''; // 初始化消息缓存
    this.messageListeners = new Map();
    this.data = '';
  }

  sendMsg(data) {
    return new Promise((resolve) => {
      const id = Date.now();
      this.addMessageListener(id, (message) => {
        this.removeMessageListenerById(id);
        resolve(message);
      });
      this.message = ''; // 初始化消息缓存
      this.data = data;
      console.log(`send to esp32: ${data}`);
      this.send(Buffer.from(data));
    });
  }

  addMessageListener(id, listener) {
    if (!this.messageListeners.has(id)) {
      this.messageListeners.set(id, listener);
    }
  }

  notifyMessage(message) {
    this.messageListeners.forEach((listener) => {
      listener.call(listener, message);
    });
  }

  removeMessageListenerById(id) {
    if (this.messageListeners.has(id)) {
      this.messageListeners.delete(id);
    }
  }

  /**
   * 接收到micro:bit发来的消息
   * @param {*} data
   */
  onMessage(data) {
    if (data) {
      const msg = Buffer.from(data).toString();
      this.resolveMsg(msg);
    }
  }

  /**
   * 解析数据
   * @param {*} msg
   */
  resolveMsg(msg) {
    this.message += msg;
    if (this.message.indexOf(lineStart) > -1) {
      this.message = this.message.replace(lineStart, '');

      if (this.message.indexOf(this.data) > -1) {
        // 去掉回显代码行
        this.message = this.message.replace(this.data, '');
      }
      console.log('onMessage:\n', this.message);
      this.notifyMessage(this.message);

      const errors = this.message.match(/.*Error:.*/g); // 简单设置了一个判断报错的关键字段。
      if (errors) {
        Toast(errors[0], 4000);
      }

      this.message = '';
    }
  }
}

export const spRegister = getSerialPortDeviceRegister({
  DeviceConnection: ESP32SerialportConnection,
  // 以下配置均为可选配置
  Options: {
    openOptions: {
      baudRate: 115200, // 串口打开的波特率
      bufferSize: 12 * 1024 * 1024, // 缓冲区大小
    },
    queueOptions: {
      enable: true, // 数据发送是否启用队列
      interval: 70, // 启用队列时数据发送的间隔
    },
    // 发现设备时过滤用的vid和pid,配置后将只显示和配置id一致的串口设备
    filter: {
      vid: '10c4',
      pid: 'ea60',
    },
    // 自定义显示串口设备名
    customDeviceName: (data) => `esp32_${data?.comName}`,
  },
});
