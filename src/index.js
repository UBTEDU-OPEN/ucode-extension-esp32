import { UCodeLinkAPI } from '@ubtech/ucode-extension-common-sdk';
import { ExampleDeviceExtension } from './block';
import { spRegister } from './devices/sp-device';

const { injectRpcClient } = UCodeLinkAPI;

console.log('初始化硬件插件: ucode-extension-exp32 ');

injectRpcClient();

const register = {
  DeviceRegister: [spRegister],
  BlockRegister: ExampleDeviceExtension,
};

/**
 * 调用 Worker 全局变量 self.UCode 注册
 */
self.UCode.extensions.register(register);
