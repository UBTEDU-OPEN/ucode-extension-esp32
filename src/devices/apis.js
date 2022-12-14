/*
 * @Description:
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-12-14 16:09:57
 */

// 生成4位随机数
function randomVarName(prefix) {
  return prefix + Math.random().toString(36).substring(2, 6);
}

function createScript(imports = ['machine']) {
  return (script) => {
    return `import ${imports.join(',')};${script}\r\n`;
  };
}

/**
 * 设置引脚电平，
 * @param {*} pin 在ESP32上标注了 “D”+数字 的引脚
 * @param {*} value 0, 1
 * @returns
 */
export function setPinValue(pin, value) {
  const varName = randomVarName('pin_');
  return createScript()(`${varName}=machine.Pin(${pin}, machine.Pin.OUT);${varName}.value(${value});`);
}

/**
 * 设置pwm模式
 * @param {*} pin 引脚
 * @param {*} freq 频率
 * @param {*} duty 占空比
 * @returns
 */
export function setPinPWM(pin, freq, duty) {
  const pinName = randomVarName('pin_');
  const pwmName = randomVarName('pwm_');
  return createScript()(
    `${pinName}=machine.Pin(${pin});` +
      `${pwmName}=machine.PWM(${pinName});` +
      `${pwmName}.freq(${freq});` +
      `${pwmName}.duty(${duty});`
  );
}

/**
 * 取消pwm模式
 * @param {*} pin 引脚
 * @returns
 */
export function deinitPinPWM(pin) {
  const pinName = randomVarName('pin_');
  const pwmName = randomVarName('pwm_');
  return createScript()(`${pinName}=machine.Pin(${pin});` + `${pwmName}=machine.PWM(${pinName});` + `${pwmName}.deinit();`);
}

/**
 * 读引脚数字量
 * @param {*} pin
 * @returns
 */
export function readPin(pin) {
  const pinName = randomVarName('pin_');
  return createScript()(`${pinName}=machine.Pin(${pin});` + `${pinName}.value();`);
}

/**
 * 读引脚模拟量
 * @param {*} pin
 * @returns
 */
export function readPinADC(pin) {
  const adcName = randomVarName('adc_');
  return createScript()(`${adcName}=machine.ADC(machine.Pin(${pin}));` + `${adcName}.read();`);
}

/**
 * 读触摸引脚的触摸量
 * @param {*} pin
 * @returns
 */
export function readTouchPin(pin) {
  const touchName = randomVarName('touch_');
  return createScript()(`${touchName}=machine.TouchPad(machine.Pin(${pin}));` + `${touchName}.read();`);
}

/**
 * 测量DHT传感器的温度或湿度值
 * d = dht.DHT11(machine.Pin(4));
 * d = dht.DHT22(machine.Pin(4));
 * d.measure();
 * d.temperature();
 * d.humidity();
 * @param {*} pin
 * @param {*} sensorClass DHT11, DHT22
 * @param {*} measureType temperature, humidity
 * @returns
 */
export function readDHT(pin, sensorClass, measureType) {
  const varName = randomVarName('dht_');
  return createScript(['machine', 'dht'])(
    `${varName}=dht.${sensorClass}(machine.Pin(${pin}));` + `${varName}.measure();` + `${varName}.${measureType}();`
  );
}

export function memFree() {
  return 'gc.mem_free();\r\n';
}

/**
 * 自由编程
 * @param {*} script
 * @returns
 */
export function customScript(script) {
  return `${script}\r\n`;
}
