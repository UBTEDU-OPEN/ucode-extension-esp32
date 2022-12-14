import { CommonUtility } from '@ubtech/ucode-extension-common-sdk';
import { pinMenus, pinValueMenus, adcPinMenus, touchPinMenus, dhtMenus, measureMenus } from './menus';
import ESP32, { DHT_MEASURE_TYPE } from './esp32';
import { DHT_SENSOR_CLASS } from './esp32';

const { Cast } = CommonUtility;

export class ExampleDeviceExtension {
  getInfo() {
    return {
      name: 'esp32',
      blocks: [
        {
          opcode: 'setPinValue',
          func: 'setPinValue',
          blockType: self.UCode.BlockType.COMMAND,
          text: '设置引脚 [PIN] 为 [VALUE] 状态',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'pinMenus',
              defaultValue: '2',
            },
            VALUE: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinValueMenus',
              defaultValue: 1,
            },
          },
        },
        {
          opcode: 'setPinValue2',
          func: 'setPinValue',
          blockType: self.UCode.BlockType.COMMAND,
          text: '设置引脚 [PIN] 为 [VALUE] 状态',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: '2',
            },
            VALUE: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinValueMenus',
              defaultValue: 1,
            },
          },
        },
        '---',
        {
          opcode: 'setPinPWM',
          func: 'setPinPWM',
          blockType: self.UCode.BlockType.COMMAND,
          text: '设置引脚 [PIN] 为 PWM 模式：频率 [FREQ] 占空比 [DUTY]',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinMenus',
              defaultValue: 2,
            },
            FREQ: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 500,
            },
            DUTY: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 50,
            },
          },
        },
        {
          opcode: 'setPinPWM2',
          func: 'setPinPWM',
          blockType: self.UCode.BlockType.COMMAND,
          text: '设置引脚 [PIN] 为 PWM 模式：频率 [FREQ] 占空比 [DUTY]',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 2,
            },
            FREQ: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 500,
            },
            DUTY: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 50,
            },
          },
        },
        {
          opcode: 'deinitPinPWM',
          func: 'deinitPinPWM',
          blockType: self.UCode.BlockType.COMMAND,
          text: '取消引脚 [PIN] PWM 模式',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinMenus',
              defaultValue: 2,
            },
          },
        },
        {
          opcode: 'deinitPinPWM2',
          func: 'deinitPinPWM',
          blockType: self.UCode.BlockType.COMMAND,
          text: '取消引脚 [PIN] PWM 模式',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 2,
            },
          },
        },
        '---',
        {
          opcode: 'readPin',
          func: 'readPin',
          blockType: self.UCode.BlockType.REPORTER,
          text: '读取引脚 [PIN] 的数字量',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinMenus',
              defaultValue: 2,
            },
          },
        },
        {
          opcode: 'readPinADC',
          func: 'readPinADC',
          blockType: self.UCode.BlockType.REPORTER,
          text: '读取引脚 [PIN] 的模拟量',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'adcPinMenus',
              defaultValue: 32,
            },
          },
        },
        {
          opcode: 'readTouchPin',
          func: 'readTouchPin',
          blockType: self.UCode.BlockType.REPORTER,
          text: '读取触摸引脚 [PIN] 的触摸量',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'touchPinMenus',
              defaultValue: 2,
            },
          },
        },
        '---',
        {
          opcode: 'readDHT',
          func: 'readDHT',
          blockType: self.UCode.BlockType.REPORTER,
          text: '通过 引脚 [PIN] 传感器 [SENSOR] 测量 [MEASURE]',
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              menu: 'pinMenus',
              defaultValue: 2,
            },
            SENSOR: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'dhtMenus',
              defaultValue: DHT_SENSOR_CLASS.DHT11,
            },
            MEASURE: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'measureMenus',
              defaultValue: DHT_MEASURE_TYPE.TEMPERATURE,
            },
          },
        },
        '---',
        {
          opcode: 'customScript',
          blockType: self.UCode.BlockType.COMMAND,
          text: '自由编程[SCRIPT]',
          arguments: {
            SCRIPT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'import machine; pin=machine.Pin(2,machine.Pin.OUT); pin.value(1);',
            },
          },
        },
        '---',
        {
          opcode: 'memFree',
          blockType: self.UCode.BlockType.COMMAND,
          text: '清理内存',
        },
      ],
      menus: {
        // 插件积木块依赖的下拉菜单
        pinMenus: {
          acceptReporters: false,
          items: pinMenus,
        },
        pinValueMenus: {
          acceptReporters: false,
          items: pinValueMenus,
        },
        adcPinMenus: {
          acceptReporters: false,
          items: adcPinMenus,
        },
        touchPinMenus: {
          acceptReporters: false,
          items: touchPinMenus,
        },
        dhtMenus: {
          acceptReporters: false,
          items: dhtMenus,
        },
        measureMenus: {
          acceptReporters: false,
          items: measureMenus,
        },
      },
    };
  }

  /**
   * 设置引脚电平状态
   * @param {*} args
   * @param {*} util
   * @returns
   */
  setPinValue(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      const value = Cast.toNumber(args.VALUE);
      return device.setPinValue(pin, value);
    }
  }

  /**
   * 设置引脚PWM状态
   * @param {*} args
   * @param {*} util
   * @returns
   */
  setPinPWM(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      const freq = Cast.toNumber(args.FREQ);
      const duty = Cast.toNumber(args.DUTY);
      return device.setPinPWM(pin, freq, duty);
    }
  }

  /**
   * 取消pwm模式
   * @param {*} args
   * @param {*} util
   * @returns
   */
  deinitPinPWM(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      return device.deinitPinPWM(pin);
    }
  }

  /**
   * 读引脚数字量
   * @param {*} args
   * @param {*} util
   * @returns
   */
  readPin(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      return device.readPin(pin);
    }
  }

  /**
   * 读取引脚模拟量
   * @param {*} args
   * @param {*} util
   * @returns
   */
  readPinADC(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      return device.readPinADC(pin);
    }
  }

  /**
   * 读取触摸引脚的触摸量
   * @param {*} args
   * @param {*} util
   * @returns
   */
  readTouchPin(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      return device.readTouchPin(pin);
    }
  }

  /**
   * 测量温度、湿度
   * @param {*} args
   * @param {*} util
   */
  readDHT(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const pin = Cast.toNumber(args.PIN);
      const sensor = Cast.toString(args.SENSOR);
      const measure = Cast.toString(args.MEASURE);
      return device.readDHT(pin, sensor, measure);
    }
  }

  /**
   * 清理内存
   * @param {*} args
   * @param {*} util
   * @returns
   */
  memFree(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      return device.memFree();
    }
  }

  /**
   * 自由编程
   * @param {*} args
   * @param {*} util
   * @returns
   */
  customScript(args, util) {
    const device = ESP32.getInstance(util.targetId);
    if (device.isConnected()) {
      const script = Cast.toString(args.SCRIPT);
      return device.customScript(script);
    }
  }
}
