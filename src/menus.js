/*
 * @Description:
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-12-14 16:09:24
 */
import { DHT_MEASURE_TYPE, DHT_SENSOR_CLASS } from './esp32';

export const pinMenus = [
  {
    text: 'D2',
    value: 2,
  },
  {
    text: 'D4',
    value: 4,
  },
  {
    text: 'D5',
    value: 5,
  },
  {
    text: 'D12',
    value: 12,
  },
  {
    text: 'D13',
    value: 13,
  },
  {
    text: 'D14',
    value: 14,
  },
  {
    text: 'D15',
    value: 15,
  },
  {
    text: 'D18',
    value: 18,
  },
  {
    text: 'D19',
    value: 19,
  },
  {
    text: 'D21',
    value: 21,
  },
  {
    text: 'D22',
    value: 22,
  },
  {
    text: 'D23',
    value: 23,
  },
  {
    text: 'D25',
    value: 25,
  },
  {
    text: 'D26',
    value: 26,
  },
  {
    text: 'D27',
    value: 27,
  },
  {
    text: 'D32',
    value: 32,
  },
  {
    text: 'D33',
    value: 33,
  },
  {
    text: 'D34',
    value: 34,
  },
  {
    text: 'D35',
    value: 35,
  },
];

export const pinValueMenus = [
  {
    text: '高电平',
    value: '1',
  },
  {
    text: '低电平',
    value: '0',
  },
];

export const adcPinMenus = [
  {
    text: 'D32',
    value: 32,
  },
  {
    text: 'D33',
    value: 33,
  },
  {
    text: 'D34',
    value: 34,
  },
  {
    text: 'D35',
    value: 35,
  },
];

/**
 * 触摸引脚
 */
export const touchPinMenus = [
  {
    text: 'D2',
    value: 2,
  },
  {
    text: 'D4',
    value: 4,
  },
  {
    text: 'D12',
    value: 12,
  },
  {
    text: 'D13',
    value: 13,
  },
  {
    text: 'D14',
    value: 14,
  },
  {
    text: 'D15',
    value: 15,
  },
  {
    text: 'D27',
    value: 27,
  },
  {
    text: 'D32',
    value: 32,
  },
  {
    text: 'D33',
    value: 33,
  },
];

export const dhtMenus = [
  {
    text: 'DHT11',
    value: DHT_SENSOR_CLASS.DHT11,
  },
  {
    text: 'DHT22',
    value: DHT_SENSOR_CLASS.DHT22,
  },
];

export const measureMenus = [
  {
    text: '温度',
    value: DHT_MEASURE_TYPE.TEMPERATURE,
  },
  {
    text: '湿度',
    value: DHT_MEASURE_TYPE.HUMIDITY,
  },
];
