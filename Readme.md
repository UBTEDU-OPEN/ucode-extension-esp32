# uCode4 硬件扩展 ESP32 示例

> 运行方式：ESP32 MicroPython 串口REPL模式，uCode在线模式

- [uCode4 硬件扩展 ESP32 示例](uCode4-硬件扩展-ESP32-示例)
  - [esp32固件](#esp32固件)
  - [快速预览](#快速预览)
  - [主要文件说明](#主要文件说明)
  - [uCode4开放文档](#uCode4开放文档)

## esp32固件

本扩展使用 MicroPython 官方 ESP32 固件，版本是 1.17。

[点击下载 esp32-20210902-v1.17.bin](https://micropython.org/resources/firmware/esp32-20210902-v1.17.bin)

项目中已经下载了 hex，路径为`hex/esp32-20210902-v1.17.bin`。

[点击查看固件烧录教程](https://docs.micropython.org/en/latest/esp32/tutorial/intro.html?highlight=esptool#deploying-the-firmware)

推荐使用以下命令烧录固件(需要安装python和使用pip安装esptool)

```bash
# 准备
pip install esptool

# 清空esp32固件。将 /dev/tty.usbserial-0212CC26 换成实际串口，这里只是MacOS系统的示例
python -m esptool --port /dev/tty.usbserial-0212CC26 erase_flash

# 烧录
cd hex
python -m esptool --port /dev/tty.usbserial-0212CC26 --chip esp32 write_flash -z 0x1000 esp32-20210902-v1.17.bin
```

## 快速预览

通过git克隆源代码后，分别执行以下命令，可构建出uCode4扩展文件。

> 这里默认使用`yarn`命令，你也可以使用`npm`等命令。

- 1. 安装依赖

```bash
yarn
```

- 2. 创建国际化目录i18n

```bash
yarn i18n
```

- 3. 构建

```bash
yarn compile
```

构建完成后，在`dist/`目录下，`ext.ucdext`文件即是uCode4扩展文件。

在uCode4中使用：
1. [打开uCode4](https://code.ubtrobot.com/)。
2. 点击创建作品--积木编程。
3. 切换到硬件标签，点击`添加硬件`。
4. 在空白处，单击鼠标右键，选择`添加开发者插件`。
5. 在文件选择弹窗中，选择刚编译好的`ext.ucdext`文件。
6. 添加后，点击新增的卡片，即可预览。
7. 插件也可以删除，删除后，请刷新页面。

![](esp.gif)

example运行效果：
![](examples/esp32-light.gif)

## 主要文件说明

| 路径                     | 描述                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| src/index.js             | 扩展程序入口，注册入口                                                                                              |
| src/block.js             | 扩展积木块定义文件                                                                                                  |
| src/menus.js             | 扩展积木块依赖的下拉菜单定义文件                                                                                    |
| src/esp32.js             | esp32 设备封装类，包含协议、通信等功能                                                                              |
| src/devices/sp-device.js | 串口通信类，由 uCode 扩展管理模块初始化，生成用于通信的协议对象。包括发现设备、收发数据、数据解析、数据缓存等功能。 |
| static/logo.svg          | 扩展图标                                                                                                            |
| static/manifest.json     | 扩展信息                                                                                                            |
| i18n/source/zh-cn.json   | 从src扫描并导出的默认语言的文案。esp32扩展未使用formatjs添加文案，所以里文件内容是空的。                            |

examples目录下的`.ucdx`文件可以在uCode中打开。


## uCode4开放文档

有关如何开发uCode硬件扩展，或uCode开放平台的信息，可以跳转到[开放平台文档](https://aiedu.ubtrobot.com/open/docs/01-started/usv.html)进行查阅。
