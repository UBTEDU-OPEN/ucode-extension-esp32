/*
 * @Description:
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-12-14 16:07:37
 */
import { ExtensionUI } from '@ubtech/ucode-extension-common-sdk';
import {
  setPinValue,
  setPinPWM,
  deinitPinPWM,
  readPinADC,
  readTouchPin,
  readPin,
  memFree,
  readDHT,
  customScript,
} from './devices/apis';

const { Toast } = ExtensionUI;

export const DHT_SENSOR_CLASS = {
  DHT11: 'DHT11',
  DHT22: 'DHT22',
};

export const DHT_MEASURE_TYPE = {
  TEMPERATURE: 'temperature',
  HUMIDITY: 'humidity',
};

class ESP32 {
  constructor(targetId) {
    this.targetId = targetId;
    this.onMessage = null;
  }

  /**
   * 做成单例模式
   * @param {*} targetId
   * @returns
   */
  static getInstance(targetId) {
    if (!this.mInstance) {
      this.mInstance = new ESP32(targetId);
    }
    return this.mInstance;
  }

  getDevice(needToast = true) {
    // eslint-disable-next-line no-undef
    const device = UCode.extensions.getDevice(this.targetId);
    if (!device?.isConnected() && needToast) {
      Toast('您还没连接ESP32设备！');
      this.onMessage = null;
      return undefined;
    }
    if (!this.onMessage) {
      this.onMessage = this.onReceiveMsg.bind(this);
      device.addMessageListener(this.targetId, this.onMessage);
    }
    return device;
  }

  /**
   * 监听数据，可接收一问一答数据，也可接收自动上报的数据
   * @param {*} data
   */
  onReceiveMsg(data) {
    console.log('received from esp32 :', data);
  }

  /**
   * 连接成功后，可以获取到protocol
   * @param {*} needToast
   * @returns
   */
  isConnected(needToast = true) {
    return this.getDevice(needToast)?.isConnected();
  }

  send(id, message, timeout = 3000) {
    return new Promise((resolve, reject) => {
      // 获取通信设备对象
      const device = this.getDevice(); // ESP32SerialportConnection
      if (device) {
        // 监听消息
        device.addMessageListener(id, (data) => {
          if (timeoutDispose) {
            clearTimeout(timeoutDispose);
          }
          device.removeMessageListenerById(id);
          resolve(data);
        });
        // 设置通信超时
        const timeoutDispose = setTimeout(() => {
          device.removeMessageListenerById(id);
          reject(new Error('timeout'));
        }, timeout);
        // 发送消息
        console.log('send', message);
        device?.sendMsg(message);
      } else {
        resolve('');
      }
    });
  }

  setPinValue(pin, value) {
    return new Promise((resolve) => {
      this.send(this._createMsgId(), setPinValue(pin, value)).finally(resolve);
    });
  }

  setPinPWM(pin, freq, duty) {
    return new Promise((resolve) => {
      this.send(this._createMsgId(), setPinPWM(pin, freq, duty)).finally(resolve);
    });
  }

  deinitPinPWM(pin) {
    return new Promise((resolve) => {
      this.send(this._createMsgId(), deinitPinPWM(pin)).finally(resolve);
    });
  }

  readPin(pin) {
    return this.send(this._createMsgId(), readPin(pin));
  }

  readPinADC(pin) {
    return this.send(this._createMsgId(), readPinADC(pin));
  }

  readTouchPin(pin) {
    return this.send(this._createMsgId(), readTouchPin(pin));
  }

  /**
   * 测量温湿度
   * @param {*} pin
   * @param {*} sensorClass
   * @param {*} measureType
   * @returns
   */
  readDHT(pin, sensorClass, measureType) {
    return this.send(this._createMsgId(), readDHT(pin, sensorClass, measureType));
  }

  /**
   * 释放内存
   * @returns
   */
  memFree() {
    return this.send(this._createMsgId(), memFree()).then((bytes) => `可用堆RAM字节数: ${bytes}`);
  }

  /**
   * 自由编程
   * @param {*} script
   * @returns
   */
  customScript(script) {
    return this.send(this._createMsgId(), customScript(script));
  }

  _createMsgId() {
    return crypto.randomUUID();
  }
}

export default ESP32;
