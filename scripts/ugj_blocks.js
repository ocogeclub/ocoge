/** Hard Coding!!! */
const appDocRoot = '/home/pi/Documents/ocoge/'

/** Fix Basic Blocks ****************************************************************************************/
Blockly.Blocks['ugj_control_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("番号"), "index");
    this.appendValueInput("from")
        .setCheck("Number")
        .appendField("を");
    this.appendValueInput("to")
        .setCheck("Number")
        .appendField("から");
    this.appendValueInput("by")
        .setCheck("Number")
        .appendField("まで");
    this.appendDummyInput()
        .appendField("ずつ")
        .appendField(new Blockly.FieldDropdown([["増やして","increase"], ["減らして","decrease"]]), "crease");
    this.appendStatementInput("do")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.LOOPS_HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly.Blocks['ugj_controls_for'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField(new Blockly.FieldVariable("番号"), "index");
//     this.appendValueInput("from")
//       .setCheck("Number")
//       .appendField("を");
//     this.appendValueInput("to")
//       .setCheck("Number")
//       .appendField("から");
//     this.appendValueInput("by")
//       .setCheck("Number")
//       .appendField("まで");
//     this.appendDummyInput()
//       .appendField("ずつ増やしながら");
//     this.appendStatementInput("do")
//       .setCheck(null);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Msg.LOOPS_HUE);
//     this.setTooltip("インデックス番号を決められた数ずつ増やし（減らし）ながら、ステートメントを実行します。");
//     this.setHelpUrl("");
//   }
// };
Blockly.JavaScript['ugj_control_for'] = function(block) {
  var variable_index = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('index'), Blockly.Variables.NAME_TYPE);
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);
  var value_by = Blockly.JavaScript.valueToCode(block, 'by', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_crease = block.getFieldValue('crease');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  let daishou, tasuhiku;
  if (dropdown_crease == 'increase') {daishou = '<'; tasuhiku = '+';}
  else {daishou = '>'; tasuhiku = '-';}
  var code = [
    `for (${variable_index} = ${value_from}; ${variable_index} ${daishou}= ${value_to}; ${variable_index} ${tasuhiku}= ${value_by}) {`,
    statements_do,
    `}`,
    ''
  ].join('\n');
  return code;
};
// Blockly.JavaScript['ugj_controls_for'] = function (block) {
//   var variable_index = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('index'), Blockly.Variables.NAME_TYPE);
//   var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
//   var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);
//   var value_by = Blockly.JavaScript.valueToCode(block, 'by', Blockly.JavaScript.ORDER_ATOMIC);
//   var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
//   var code = [
//     `for (${variable_index} = ${value_from}; ${variable_index} <= ${value_to}; ${variable_index} += ${value_by}) {`,
//     statements_do,
//     `}`,
//     ''
//   ].join('\n');
//   return code;
// };

Blockly.Blocks['ugj_controls_forEach'] = {
  init: function () {
    this.appendValueInput("list")
      .setCheck("Array")
      .appendField("リスト");
    this.appendDummyInput()
      .appendField("の各")
      .appendField(new Blockly.FieldVariable("項目"), "item")
      .appendField("について");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.LOOPS_HUE);
    this.setTooltip("リストの各項目について、その項目を変数「項目」としてステートメントを実行します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_controls_forEach'] = function (block) {
  var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_item = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `for (let i_index in ${value_list}) {`,
    `${variable_item} = ${value_list}[i_index];`,
    statements_do,
    `}`,
    ''
  ].join('\n');
  return code;
};

/** Additional Basic Blocks********************************************************************************* */

Blockly.Blocks['ugj_hextodec'] = {
  init: function() {
    this.appendValueInput("hex")
        .setCheck("String")
        .appendField("0x");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.MATH_HUE);
 this.setTooltip("16進数を10進数に変換します。");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_hextodec'] = function(block) {
  var value_hex = Blockly.JavaScript.valueToCode(block, 'hex', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `parseInt (${value_hex}, 16)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/** GPIO *****************************************************************************************************/

/************* */
/** GPIO Start */
/************* */
Blockly.Blocks['ugj_gpio_start'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("GPIO を使えるようにする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIOを初期化して接続します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_start'] = function (block) {
  var code = `pi.start();\n`; //
  return code;
};
// remote
Blockly.Blocks['ugj_gpio_start_remote'] = {
  init: function () {
    this.appendValueInput("host")
      .setCheck("String")
      .appendField("ホスト");
    this.appendDummyInput()
      .appendField("のGPIO を使えるようにする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("他のマシンのリモートGPIOに接続します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_start_remote'] = function (block) {
  var value_host = Blockly.JavaScript.valueToCode(block, 'host', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.start_remote(${value_host}, '8888');\n`; //
  return code;
};

/************ */
/** GPIO Stop */
/************ */
Blockly.Blocks['ugj_gpio_stop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("GPIO の後片付けをする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIOとの接続を終了します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_stop'] = function (block) {
  var code = 'pi.stop();\n';
  return code;
};

/********************* */
/** GPIO Set Output ** */
/********************* */
Blockly.Blocks['ugj_gpio_setoutput'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("を出力モードにする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIO端子のモードを出力に設定します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_setoutput'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.set_mode(${value_gpio}, pi.OUTPUT);\n`;
  return code;
};

/*********************************** */
/** GPIO Set Input and PullupDown ** */
/*********************************** */
Blockly.Blocks['ugj_gpio_setinput'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("を入力モードにして")
      .appendField(new Blockly.FieldDropdown([["プルアップ", "pi.PUD_UP"], ["プルダウン", "pi.PUD_DOWN"]]), "updown");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIO端子を入力モードにして、プルアップ・プルダウンを設定します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_setinput'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_updown = block.getFieldValue('updown');
  var code = `pi.set_mode(${value_gpio}, pi.INPUT);\n`;
  code += `pi.set_pull_up_down(${value_gpio}, ${dropdown_updown});\n`;
  return code;
};

/********************* */
/** Read GPIO Value ** */
/***********************/
Blockly.Blocks['ugj_gpio_read'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("の値");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIO端子の値をデジタル値（0または1）で読み取ります。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_read'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.read(${value_gpio})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/*******************************************/
/** GPIO Write Value - Common GPIO on/off **/
/*******************************************/
Blockly.Blocks['ugj_gpio_write'] = {
  init: function () {
    this.appendValueInput("ugj_gpio_num")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendValueInput("ugj_gpio_value")
      .setCheck("Number")
      .appendField("を");
    this.appendDummyInput()
      .appendField("にする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("GPIO端子の値をデジタル値（0または1）で出力します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_write'] = function (block) {
  var value_ugj_gpio_num = Blockly.JavaScript.valueToCode(block, 'ugj_gpio_num', Blockly.JavaScript.ORDER_ATOMIC);
  var value_ugj_gpio_value = Blockly.JavaScript.valueToCode(block, 'ugj_gpio_value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.write(${value_ugj_gpio_num}, ${value_ugj_gpio_value});\n`;
  return code;
};

/*****************/
/** Servo motor **/
/*****************/
Blockly.Blocks['ugj_gpio_servo'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendValueInput("pulsewidth")
      .setCheck("Number")
      .appendField("のサーボモータの回転を");
    this.appendDummyInput()
      .appendField("にする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("サーボモータの回転をパルス幅(1000～2000μsec)までの数値で指定します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_servo'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pulsewidth = Blockly.JavaScript.valueToCode(block, 'pulsewidth', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.set_servo_pulsewidth(${value_gpio}, ${value_pulsewidth});\n`;
  return code;
};

/********************************* */
/** Set PWM Frequency and Range ** */
/********************************* */
Blockly.Blocks['ugj_gpio_setpwmfreqrange'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("のパルス周波数を")
      .appendField(new Blockly.FieldDropdown([["10", "10"], ["20", "20"], ["40", "40"], ["50", "50"], ["80", "80"], ["100", "100"], ["200", "200"], ["400", "400"], ["800", "800"], ["8000", "8000"]]), "pwmfreq")
      .appendField("Hzにする");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("パルス周波数をセットして、GPIO端子がPWM出力できるようにします。レンジは100固定です。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_setpwmfreqrange'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pwmfreq = block.getFieldValue('pwmfreq');
  var code = [
    `pi.set_PWM_frequency(${value_gpio}, ${dropdown_pwmfreq});`,
    // `pi.set_PWM_range(${value_gpio}, 100);`,
    ""
  ].join('\n');
  return code;
};

/******************************************** */
/** Starts or stops PWM pulses on the GPIO ** */
/******************************************** */
Blockly.Blocks['ugj_gpio_setpwmdutycycle'] = {
  init: function () {
    this.appendValueInput("dutycycle")
      .setCheck("Number")
      .appendField("デューティ比");
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("% のパルスを GPIO");
    this.appendDummyInput()
      .appendField("から出力する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("デューティ比(1～100%)を指定して出力を開始します。0を指定すると出力を停止します。事前に必ずパルス周波数ブロックが実行されるようにしてください。");
    this.setHelpUrl("https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E6%AF%94");
  }
};
Blockly.JavaScript['ugj_gpio_setpwmdutycycle'] = function (block) {
  var value_dutycycle = Blockly.JavaScript.valueToCode(block, 'dutycycle', Blockly.JavaScript.ORDER_ATOMIC);
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.set_PWM_dutycycle(${value_gpio}, ${value_dutycycle});\n`;
  return code;
};

/********************** */
/** Open Serial Port ** */
/********************** */
Blockly.Blocks['ugj_gpio_serialopen'] = {
  init: function() {
    this.appendValueInput("tty")
        .setCheck("String")
        .appendField("シリアルポート");
    this.appendDummyInput()
        .appendField("を速度")
        .appendField(new Blockly.FieldDropdown([["9600","9600"], ["19200","19200"], ["115200","115200"]]), "baud")
        .appendField("bpsで開く");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("シリアルデバイスとの接続を開きます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_serialopen'] = function(block) {
  var value_tty = Blockly.JavaScript.valueToCode(block, 'tty', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_baud = block.getFieldValue('baud');
  var code = `let serhand = pi.serial_open(${value_tty}, ${dropdown_baud}, 0);`;
  return code;
};
/********************** */
/** Close Serial Port ** */
/********************** */
Blockly.Blocks['ugj_serial_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("シリアルポートを閉じる");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("シリアルデバイスとの接続を閉じます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_serial_close'] = function(block) {
  var code = 'pi.serial_close(serhand);';
  return code;
};

/************************** */
/** Write Data to Serial ** */
/************************** */
Blockly.Blocks['ugj_serial_write'] = {
  init: function () {
    this.appendValueInput("data")
      .setCheck("String")
      .appendField("シリアルポートに");
    this.appendDummyInput()
      .appendField("を送信する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("シリアル接続されたデバイスにデータを送信します。シリアルポートは開かれていなくてはいけません。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_serial_write'] = function (block) {
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.serial_write(serhand, ${value_data});\n`;
  return code;
};

/************************ */
/** Read Data from Serial */
/************************ */
Blockly.Blocks['ugj_gpio_serialread'] = {
  init: function () {
    this.appendValueInput("count")
      .setCheck("Number")
      .appendField("シリアルポートから");
    this.appendDummyInput()
      .appendField("文字読み込む");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("オープン済みシリアルポートから、指定のバイト数だけデータを読み込みます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_serialread'] = function (block) {
  var value_count = Blockly.JavaScript.valueToCode(block, 'count', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.serial_read(serhand, ${value_count})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/********************* */
/** Open I2C Device ** */
/********************* */
Blockly.Blocks['ugj_gpio_i2copen'] = {
  init: function() {
    this.appendValueInput("i2c_addr")
        .setCheck("Number")
        .appendField("アドレス");
    this.appendDummyInput()
        .appendField("の I2C デバイスを開く");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("I2C接続されたデバイスとの通信を開始します。一度にオープンできるI2Cデバイスはひとつだけです。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_i2copen'] = function(block) {
  var value_i2c_addr = Blockly.JavaScript.valueToCode(block, 'i2c_addr', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `let i2cHand = pi.i2c_open(1, ${value_i2c_addr}, 0);`;
  return code;
};
/********************** */
/** Close I2C Device ** */
/********************** */
Blockly.Blocks['ugj_gpio_i2cclose'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("I2C デバイスを閉じる");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("I2C接続されたデバイスと通信を切断します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_i2cclose'] = function (block) {
  var code = `pi.i2c_close(i2cHand);`;
  return code;
};

/****************************************************************** */
/** Writes a single byte to the specified register of the device ** */
/****************************************************************** */

Blockly.Blocks['ugj_gpio_i2cwritebyte'] = {
  init: function () {
    this.appendValueInput("reg")
      .setCheck("Number")
      .appendField("レジスタ");
    this.appendValueInput("byteData")
      .setCheck("Number")
      .appendField("に");
    this.appendDummyInput()
      .appendField("を書き込む");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("デバイスの指定されたレジスタに1バイトを書き込みます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_i2cwritebyte'] = function (block) {
  var value_reg = Blockly.JavaScript.valueToCode(block, 'reg', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bytedata = Blockly.JavaScript.valueToCode(block, 'byteData', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.i2c_write_byte_data(i2cHand, ${value_reg}, ${value_bytedata});\n`;
  return code;
};

/****************************************************************** */
/** Read a single byte from the specified resister of the device ** */
/****************************************************************** */
Blockly.Blocks['ugj_gpio_i2creadbyte'] = {
  init: function () {
    this.appendValueInput("reg")
      .setCheck("Number")
      .appendField("レジスタ");
    this.appendDummyInput()
      .appendField("の値");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("デバイスの指定されたレジスタから1バイトを読み込みます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_i2creadbyte'] = function (block) {
  var value_reg = Blockly.JavaScript.valueToCode(block, 'reg', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `pi.i2c_read_byte_data(i2cHand, ${value_reg})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/*********** */
/** DHT11/22 */
/*********** */
Blockly.Blocks['ugj_dht'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("の温湿度センサー DHT")
      .appendField(new Blockly.FieldDropdown([["11", "11"], ["22", "22"]]), "type")
      .appendField("から")
      .appendField(new Blockly.FieldVariable("気温"), "temperature")
      .appendField(new Blockly.FieldVariable("湿度"), "humidity")
      .appendField("を取得");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("温湿度センサー DHT11/DHT22 を使用して気温と湿度を読み取ります。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_dht'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  var variable_temperature = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('temperature'), Blockly.Variables.NAME_TYPE);
  var variable_humidity = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('humidity'), Blockly.Variables.NAME_TYPE);
  let fix = dropdown_type / 11 - 1;
  var code = [
    `try {`,
    `let res = await dht.read(${dropdown_type}, ${value_gpio});`,
    `${variable_temperature} = res.temperature.toFixed(${fix});`,
    `${variable_humidity} = res.humidity.toFixed(${fix});`,
    `} catch (err) {console.error("Failed to read sensor data:", err);}`,
    ''
  ].join('\n');
  return code;
};




/********************************************************************************** */
/** Extra Method : Sleep with C++ Native Module *************************************/
/** Warning: This block freezes the whole application. Cannot terminate, exit, etc. */
/********************************************************************************** */
Blockly.Blocks['ugj_gpio_sleep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["1", "1"], ["3", "3"], ["5", "5"], ["10", "10"]]), "sec")
      .appendField("秒間プログラムを強制的に停止する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("実行環境全体を完全に一時停止します。停止中はすべての操作ができなくなります。※実験用");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_sleep'] = function (block) {
  var dropdown_sec = block.getFieldValue('sec');
  var code = `pi.usleep(${dropdown_sec} * 1000000);\n`;
  return code;
};

/** Multimedia *****************************************************************************************************/

/******************* */
/** TensorFlow.js ** */
/******************* */
Blockly.Blocks['ugj_library_tensorflow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("TensorFlowによる画像認識（推論）");
    this.setOutput(true, "Library");
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("tensorflow.jsをロードし、推論ができるようにします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_library_tensorflow'] = function (block) {
  var code = `'./scripts/tensorflow.min.js'`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
/********************** */
/** Object Detection ** */
/********************** */
Blockly.Blocks['ugj_tfpredict_init'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("画像認識のビデオを表示");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("画像認識（推論）をするためのビデオストリームを表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_tfpredict_init'] = function (block) {
  var code = [
    `const video = document.getElementById('subdisplay');`,
    `video.style.display = 'inline-block';`,
    `const overlay = document.createElement('canvas');`,
    `overlay.setAttribute('width', video.width);`,
    `overlay.setAttribute('height', video.height);`,
    "const context = overlay.getContext('2d');",
    "const stream = await navigator.mediaDevices.getUserMedia({ video: {} });",
    "video.srcObject = stream;",
    ""
  ].join('\n');
  return code;
};
Blockly.Blocks['ugj_tfpredict_loadmodel'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("学習済みの指数えモデル (sign_language_vgg16) を読み込む");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("ardamavi氏による指数え画像データセットをPonDad氏がts.js用モデルにコンバートしたものです。");
    this.setHelpUrl("https://github.com/PonDad/manatee");
  }
};
Blockly.JavaScript['ugj_tfpredict_loadmodel'] = function (block) {
  var code = [
    "const model = await tf.loadModel('./scripts/sign_language_vgg16/model.json');",
    "const CLASSES = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four',5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'};",
    ""
  ].join('\n');
  return code;
};
Blockly.Blocks['ugj_tfpredict_predict'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("推論をして")
      .appendField(new Blockly.FieldVariable("結果"), "result")
      .appendField("を取得する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("読み込んだモデルを使用してカメラ画像から画像認識を行い、変数に代入します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_tfpredict_predict'] = function (block) {
  var variable_result = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('result'), Blockly.Variables.NAME_TYPE);
  var code = [
    "context.drawImage(video, 0, 0, video.width, video.height);",
    "let tensor = tf.fromPixels(canvas).resizeNearestNeighbor([100,100]).toFloat();",
    "tensor = tensor.div(tf.scalar(255)).expandDims();",
    "let prediction = await model.predict(tensor).data();",
    "let results = Array.from(prediction).map(function(p,i){",
    "  return {",
    "    probability: p,",
    "    className: CLASSES[i]",
    "  };",
    "}).sort(function(a,b){",
    "  return b.probability-a.probability;",
    "}).slice(0,5);",
    "let r = '';",
    "results.forEach(function(p){",
    "  r += `${p.className}:${p.probability.toFixed(6)},`;",
    "});",
    `${variable_result} = r;`,
    ""
  ].join('\n');
  return code;
};


/******************** */
/** Face Detection ** */
/******************** */
Blockly.Blocks['ugj_face_library'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("face-api.jsによる顔認識");
    this.setInputsInline(true);
    this.setOutput(true, "Library");
    // this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("face-api.jsをロードし、顔認識ができるようにします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_face_library'] = function (block) {
  var code = `'./scripts/face-api.js'`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.Blocks['ugj_face_init'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("顔認識のビデオを開始");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("顔認識のためのビデオストリームを開始します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_face_init'] = function (block) {
  var code = [
    "const videoEl = document.getElementById('subdisplay');",
    "const stream = await navigator.mediaDevices.getUserMedia({ video: {} });",
    "videoEl.srcObject = stream;",
    ""
  ].join('\n');
  return code;
};
Blockly.Blocks['ugj_face_display'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ビデオを表示");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("カメラの映像を画像エリアに表示します。必須ではないブロックです。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_face_display'] = function (block) {
  var code = [
    "videoEl.style.display = 'inline-block';",
    `const overlay = document.createElement('canvas');`,
    `overlay.setAttribute('width', videoEl.width);`,
    `overlay.setAttribute('height', videoEl.height);`,
    `overlay.className = 'subdisplay';`,
    `document.getElementById('display_area').appendChild(overlay);`,
    ""
  ].join('\n');
  return code;
};
Blockly.Blocks['ugj_face_detect'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("顔の位置（")
      .appendField(new Blockly.FieldVariable("左"), "x")
      .appendField(new Blockly.FieldVariable("上"), "y")
      .appendField(new Blockly.FieldVariable("幅"), "w")
      .appendField(new Blockly.FieldVariable("高さ"), "h")
      .appendField("）を検出したら");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("顔を発見したら動作します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_face_detect'] = function (block) {
  var variable_x = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('x'), Blockly.Variables.NAME_TYPE);
  var variable_y = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('y'), Blockly.Variables.NAME_TYPE);
  var variable_w = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('w'), Blockly.Variables.NAME_TYPE);
  var variable_h = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('h'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    "await faceapi.loadTinyFaceDetectorModel('./scripts/models/');",
    "const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold : 0.3 });",
    "videoEl.onplay = onPlay;",
    "async function onPlay() {",
    "   let result = await faceapi.detectSingleFace(videoEl, options);",
    "   if (result) {",
    `     ${variable_x} = Math.round(result.box.x);`,
    `     ${variable_y} = Math.round(result.box.y);`,
    `     ${variable_w} = Math.round(result.box.width);`,
    `     ${variable_h} = Math.round(result.box.height);`,
    statements_do,
    "   }",
    "    setTimeout(() => onPlay())",
    "}",
    ""
  ].join('\n');
  return code;
};
Blockly.Blocks['ugj_face_drawrect'] = {
  init: function () {
    this.appendValueInput("color")
      .setCheck("Colour")
      .appendField("顔にボックスを");
    this.appendDummyInput()
      .appendField("色で描画");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("顔の位置に四角形を表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_face_drawrect'] = function (block) {
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    "      const { width, height } = videoEl instanceof HTMLVideoElement",
    "        ? faceapi.getMediaDimensions(videoEl)",
    "        : videoEl;",
    "      overlay.width = width;",
    "      overlay.height = height;",
    "      const resizedDetections = [result].map(res => res.forSize(width, height));",
    `      faceapi.drawDetection(overlay, resizedDetections.map(det => det.box), { withScore: false, lineWidth: 4, boxColor: ${value_color} });`,
    ""
  ].join('\n');
  return code;
};

/**************************** */
/** Say while some seconds ** */
/**************************** */
Blockly.Blocks['ugj_canvas_say'] = {
  init: function () {
    this.appendValueInput("say")
      .setCheck("String");
    this.appendValueInput("sec")
      .setCheck("Number")
      .appendField("と");
    this.appendDummyInput()
      .appendField("秒言う");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キャンバスにフキダシを作ります。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_say'] = function (block) {
  var value_say = Blockly.JavaScript.valueToCode(block, 'say', Blockly.JavaScript.ORDER_ATOMIC);
  var value_sec = Blockly.JavaScript.valueToCode(block, 'sec', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `ugj_fukidashi(${value_say}, ${value_sec});`,
    ''
  ].join('\n');
  return code;
};

/*************************** */
/** Canvas Initialization ** */
/*************************** */
Blockly.Blocks['ugj_canvas_init'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("キャンバスを表示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キャンバスを表示し、使用できるようにします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_init'] = function (block) {
  var code = [
    `let canvas = document.getElementById('gcanvas');`,
    `canvas.style.display = 'inline-block';`,
    "let ctx = canvas.getContext('2d');",
    ''
  ].join('\n');

  return code;
};

/************************* */
/** Canvas Finalization ** */
/************************* */
Blockly.Blocks['ugj_canvas_finalize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("キャンバスを片付ける");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("使ったキャンバスを片付けます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_finalize'] = function (block) {
  var code = `document.getElementById('gcanvas').style.display = 'none';\n`;
  return code;
};

/**************************** */
/** Load Image File to Canvas */
/**************************** */
Blockly.Blocks['ugj_canvas_loadimg'] = {
  init: function () {
    this.appendValueInput("imgfilename")
      .setCheck("String")
      .appendField("ファイル名");
    this.appendDummyInput()
      .appendField("の画像をキャンバスに描画");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("画像ファイルの内容をキャンバス上にロードします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_loadimg'] = function (block) {
  var value_imgfilename = Blockly.JavaScript.valueToCode(block, 'imgfilename', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `let img = new Image();`,
    `img.src = '${appDocRoot}' + ${value_imgfilename};`,
    `img.onload = () => ctx.drawImage(img,0,0);`,
    // `ugj_canvasImg('${appDocRoot}' + ${value_imgfilename});`,
    ''
  ].join('\n');
  return code;
};


/**************** */
/** Clear Rect ** */
/**************** */
Blockly.Blocks['ugj_canvas_clearrect'] = {
  init: function () {
    this.appendValueInput("x")
      .setCheck("Number")
      .appendField("長方形に消去：X");
    this.appendValueInput("y")
      .setCheck("Number")
      .appendField("Y");
    this.appendValueInput("w")
      .setCheck("Number")
      .appendField("幅");
    this.appendValueInput("h")
      .setCheck("Number")
      .appendField("高さ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("長方形に図形を消去します。左上の頂点の座標と、幅・高さを指定します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_clearrect'] = function (block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
  var value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `ctx.clearRect(${value_x},${value_y}, ${value_w}, ${value_h});\n`;
  return code;
};


/********************** */
/** Get Canvas Width ** */
/********************** */
Blockly.Blocks['ugj_canvas_width'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("キャンバスの幅");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キャンバスの幅を取得します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_width'] = function (block) {
  var code = 'canvas.width';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
/*********************** */
/** Get Canvas Height ** */
/*********************** */
Blockly.Blocks['ugj_canvas_height'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("キャンバスの高さ");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キャンバスの高さを取得します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_height'] = function (block) {
  var code = 'canvas.height';
  return [code, Blockly.JavaScript.ORDER_NONE];
};



/*************************** */
/** Draw Circle on Canvas ** */
/*************************** */
Blockly.Blocks['ugj_canvas_drawcircle'] = {
  init: function () {
    this.appendValueInput("x")
      .setCheck("Number")
      .appendField("中心の座標 X");
    this.appendValueInput("y")
      .setCheck("Number")
      .appendField(", Y");
    this.appendValueInput("r")
      .setCheck("Number")
      .appendField(", 半径");
    this.appendValueInput("color")
      .setCheck("Colour")
      .appendField(", 塗りつぶしの色");
    this.appendDummyInput()
      .appendField("の円を描画");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("円を描画します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_drawcircle'] = function (block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    'ctx.beginPath();',
    `ctx.arc(${value_x}, ${value_y}, ${value_r}, 0, Math.PI*2);`,
    `ctx.fillStyle = ${value_color};`,
    'ctx.fill();',
    'ctx.closePath();',
    ''
  ].join('\n');
  return code;
};

/************************* */
/** Draw Rect on Canvas ** */
/************************* */
Blockly.Blocks['ugj_canvas_drawrect'] = {
  init: function () {
    this.appendValueInput("x")
      .setCheck("Number")
      .appendField("左上の座標 (X:");
    this.appendValueInput("y")
      .setCheck("Number")
      .appendField(", Y:");
    this.appendValueInput("w")
      .setCheck("Number")
      .appendField("), 幅:");
    this.appendValueInput("h")
      .setCheck("Number")
      .appendField(", 高さ:");
    this.appendValueInput("color")
      .setCheck("Colour")
      .appendField(", 塗りつぶしの色:");
    this.appendDummyInput()
      .appendField("の四角形を描画");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キャンバス上に長方形を描画します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_canvas_drawrect'] = function (block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
  var value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `ctx.beginPath();`,
    `ctx.rect(${value_x}, ${value_y}, ${value_w}, ${value_h});`,
    `ctx.fillStyle = ${value_color};`,
    `ctx.fill();`,
    `ctx.closePath();`,
    ''
  ].join('\n');
  return code;
};

/****************************** */
/** KeyUpDown Event Listener ** */
/****************************** */
Blockly.Blocks['ugj_event_key'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("キーボードの")
      .appendField(new Blockly.FieldVariable("キー"), "key")
      .appendField("を")
      .appendField(new Blockly.FieldDropdown([["押したとき", "keydown"], ["離したとき", "keyup"]]), "updown");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("キーボードを押したり離したりした時のアクションです。");
    this.setHelpUrl("https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/key/Key_Values");
  }
};
Blockly.JavaScript['ugj_event_key'] = function (block) {
  var variable_key = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('key'), Blockly.Variables.NAME_TYPE);
  var dropdown_updown = block.getFieldValue('updown');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `document.addEventListener('${dropdown_updown}', async (e) => {`,
    `    ${variable_key} = e.key;`,
    statements_do,
    `}, false);`,
    ''
  ].join('\n');
  return code;
};

/**************** */
/** Play Sound ** */
/**************** */
Blockly.Blocks['ugj_sound_play'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["ニャー", "meow"], ["コン", "bounce"], ["チン", "type_chime"], ["ディン", "type_dink"], ["タイプ", "type_tap"], ["空白", "type_space"], ["改行", "type_return"]]), "sound")
      .appendField("の音を鳴らす");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("音を鳴らします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_sound_play'] = function (block) {
  var dropdown_sound = block.getFieldValue('sound');
  var code = `ugj_soundPlay('${dropdown_sound}');\n`;
  return code;
};

/***************************** */
/** Cloud Speech Recognization */
/***************************** */
Blockly.Blocks['ugj_multimedia_cloudspeech_recognition'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("音声認識で")
      .appendField(new Blockly.FieldVariable("ことば"), "transcript")
      .appendField("を取得する：")
      .appendField(new Blockly.FieldDropdown([["一回のみ", "once"], ["継続", "continue"]]), "continuous")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "interim")
      .appendField("未確定も取得");
    this.appendStatementInput("isFinal_do")
      .setCheck(null)
      .appendField("確定したら");
    this.appendStatementInput("isInterim_do")
      .setCheck(null)
      .appendField("未確定なら");
    this.appendStatementInput("onStart_do")
      .setCheck(null)
      .appendField("開始したら");
    this.appendStatementInput("onError_do")
      .setCheck(null)
      .appendField("停止したら");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("Google Cloud Speech API による音声認識を行います。言葉を検知したらステートメントが実行されます。認識途中の暫定結果を取得することもできます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_multimedia_cloudspeech_recognition'] = function (block) {
  var variable_transcript = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('transcript'), Blockly.Variables.NAME_TYPE);
  var dropdown_continuous = block.getFieldValue('continuous');
  var checkbox_interim = block.getFieldValue('interim') == 'TRUE';
  var statements_isfinal_do = Blockly.JavaScript.statementToCode(block, 'isFinal_do');
  var statements_isinterim_do = Blockly.JavaScript.statementToCode(block, 'isInterim_do');
  var statements_onStart_do = Blockly.JavaScript.statementToCode(block, 'onStart_do');
  var statements_onError_do = Blockly.JavaScript.statementToCode(block, 'onError_do');
  var functionName = Blockly.JavaScript.provideFunction_(
    'listenTimeout',
    [
      'const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = () => {',
      'clearTimeout(tout);',
      'tout = setTimeout(() => {',
      `console.log('Timeout.');`,
      'recording.stop();',
      '}, 15000);',
      '}'
    ]
  );
  var code = [
    `const client = new speech.SpeechClient({`,
    `projectId: 'ugjiclass',`,
    `keyFilename: './.shared/OCOGE-8a8e7ecac31c.json',`,
    `});`,
    `const request = {`,
    `config: {`,
    `encoding: 'LINEAR16',`,
    `sampleRateHertz: 16000,`,
    `languageCode: 'ja-JP'`,
    `},`,
    ``].join('\n');
  if (dropdown_continuous == 'once') code += 'singleUtterance: true,\n';
  if (checkbox_interim == true) code += 'interimResults: true,\n';
  code += [
    `};`,
    `var tout;`,
    `${functionName}();`,
    `const recognizeStream = client`,
    `.streamingRecognize(request)`,
    `.on('error', console.error)`,
    `.on('data', data => {`,
    `let result = data.results[0];`,
    `if (result && result.alternatives[0]) {`,
    `${variable_transcript} = result.alternatives[0].transcript;`,
    `if (result.isFinal) {`,
    statements_isfinal_do,
    `${functionName}();`,
    `} else {`,
    statements_isinterim_do,
    `}`,
    `} else {`,
    `console.log('Reached transcription time limit.');`,
    `recording.stop();`,
    'clearTimeout(tout);',
    `}`,
    `});`,
    `const recording = recorder.record({`,
    `sampleRate: 16000,`,
    `recorder: 'sox',`,
    `silence: '0.5',`,
    `});`,
    `recording`,
    `.stream()`,
    `.on('error', err => {${statements_onError_do}})`,
    `.pipe(recognizeStream);`,
    statements_onStart_do,
    ''
  ].join('\n');
  return code;
};

/*************************** */
/** Web Speech Recognization */
/*************************** */
Blockly.Blocks['ugj_multimedia_webspeech_recognition'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("音声認識で")
      .appendField(new Blockly.FieldVariable("ことば"), "transcript")
      .appendField("を取得する：")
      .appendField(new Blockly.FieldDropdown([["一回のみ", "once"], ["継続", "continue"]]), "continuous")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "interim")
      .appendField("未確定も取得");
    this.appendStatementInput("isFinal_do")
      .setCheck(null)
      .appendField("確定したら");
    this.appendStatementInput("isInterim_do")
      .setCheck(null)
      .appendField("未確定なら");
    this.appendStatementInput("onStart_do")
      .setCheck(null)
      .appendField("開始したら");
    this.appendStatementInput("onError_do")
      .setCheck(null)
      .appendField("停止したら");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setColour(Blockly.Msg.UGJ_MULTIMEDIA_HUE);
    this.setTooltip("Web Speech API による音声認識を行います。言葉を検知したらステートメントが実行されます。認識途中の暫定結果を取得することもできます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_multimedia_webspeech_recognition'] = function (block) {
  var variable_transcript = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('transcript'), Blockly.Variables.NAME_TYPE);
  var dropdown_continuous = block.getFieldValue('continuous');
  var checkbox_interim = block.getFieldValue('interim') == 'TRUE';
  var statements_isfinal_do = Blockly.JavaScript.statementToCode(block, 'isFinal_do');
  var statements_isinterim_do = Blockly.JavaScript.statementToCode(block, 'isInterim_do');
  var statements_onStart_do = Blockly.JavaScript.statementToCode(block, 'onStart_do');
  var statements_onEnd_do = Blockly.JavaScript.statementToCode(block, 'onError_do');
  var code = [
    `SpeechRecognition = webkitSpeechRecognition;`,
    `let recognizer = new SpeechRecognition();`,
    `recognizer.lang = 'ja-JP';`
  ].join('\n');
  if (dropdown_continuous == 'continue') code += 'recognizer.continuous = true;\n';
  if (checkbox_interim == true) code += 'recognizer.interimResults = true;\n';
  code += [
    `recognizer.onresult = (event) => {`,
    `let result = event.results[event.resultIndex];`,
    `${variable_transcript} = result[0].transcript;`,
    `if (result.isFinal) {`,
    statements_isfinal_do,
    `} else {`,
    statements_isinterim_do,
    `}`,
    `}`,
    `recognizer.onstart = () => {`,
    statements_onStart_do,
    `}`,
    `recognizer.onend = () => {`,
    statements_onEnd_do,
    `}`,
    `recognizer.start();`,
    ''
  ].join('\n');
  return code;
};



/** Network *****************************************************************************************************/
/**************** */
/** TCP/IP Socket */
/**************** */
Blockly.Blocks['ugj_socket'] = {
  init: function () {
    this.appendValueInput("host")
      .setCheck("String")
      .appendField("ホスト");
    this.appendValueInput("port")
      .setCheck("Number")
      .appendField("ポート");
    this.appendDummyInput()
      .appendField("で TCP 接続する");
    this.appendStatementInput("connect")
      .setCheck(null)
      .appendField("接続したら");
    this.appendStatementInput("data")
      .setCheck(null)
      .appendField(new Blockly.FieldVariable("受信データ"), "data")
      .appendField("が来たら");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("TCP接続(Telnet)でサーバーと接続します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_socket'] = function (block) {
  var value_host = Blockly.JavaScript.valueToCode(block, 'host', Blockly.JavaScript.ORDER_ATOMIC);
  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_connect = Blockly.JavaScript.statementToCode(block, 'connect');
  var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
  var statements_data = Blockly.JavaScript.statementToCode(block, 'data');
  var code = [
    `var client = net.connect(${value_port}, ${value_host});`,
    `client.on('connect', async ()=>{`,
    statements_connect,
    `}).on('data', async data=>{`,
    `${variable_data} = data.toString('utf-8', 0, data.length);`,
    statements_data,
    `}).on('close', ()=>{`,
    `console.log('Connection closed.');`,
    `});`,
    ''
  ].join('\n');
  return code;
};
/*************** */
/** Socket Write */
/*************** */
Blockly.Blocks['ugj_socket_write'] = {
  init: function () {
    this.appendValueInput("cmd")
      .setCheck("String")
      .appendField("TCP接続に");
    this.appendDummyInput()
      .appendField("を送信する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("TCP接続で開いたソケットにデータを書き込みます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_socket_write'] = function (block) {
  var value_cmd = Blockly.JavaScript.valueToCode(block, 'cmd', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `client.write(${value_cmd});`,
    ''
  ].join('\n');
  return code;
};

/************** */
/** HTTP Server */
/************** */
Blockly.Blocks['ugj_network_httpserver'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Webサーバを起動してアクセスを待ち、")
      .appendField(new Blockly.FieldVariable("url"), "URL")
      .appendField("へアクセスがあったら");
    this.appendStatementInput("do")
      .setCheck(null);
    this.appendValueInput("response")
      .setCheck(null)
      .appendField("最後に");
    this.appendDummyInput()
      .appendField("を表示してアクセス待ちに戻る");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("HTTPサーバを起動します。ポートは3000固定です。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_network_httpserver'] = function (block) {
  var variable_url = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('URL'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var value_response = Blockly.JavaScript.valueToCode(block, 'response', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `let req, res;`,
    `http.createServer(async (req, res) => {`,
    `res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });`,
    `${variable_url} = req.url;`,
    statements_do,
    // `res.write('<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"></head><body>');`,
    `res.end(${value_response});`,
    `}).listen(3000);`,
    ''
  ].join('\n');
  return code;
};

/******************** */
/** axios HTTP client */
/******************** */
// Get URL
Blockly.Blocks['ugj_network_axios_geturl'] = {
  init: function () {
    this.appendValueInput("url")
      .setCheck("String")
      .appendField("URL");
    this.appendDummyInput()
      .appendField("の内容");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("URLにGETリクエストを送信し、レスポンスを取得します。エラーの場合、HTTPステータスコードを返します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_network_axios_geturl'] = function (block) {
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var functionName = Blockly.JavaScript.provideFunction_(
    'getUrl',
    [
      'const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = async url => {',
      'let res, ret;',
      'try {',
      `res = await axios.get(url);`,
      'ret = res.data;',
      '} catch (error) {',
      'if (error.response) {',
      'ret = error.response.status;',
      '} else {',
      'ret = 999;',
      '}',
      '}',
      'return ret;',
      '}'
    ]
  );
  var code = `await ${functionName}(${value_url})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/*********** */
/** Sendmail */
/*********** */
Blockly.Blocks['ugj_network_sendmail'] = {
  init: function () {
    this.appendValueInput("to")
      .setCheck("String")
    this.appendValueInput("subject")
      .setCheck("String")
      .appendField("へメールを送信：件名");
    this.appendValueInput("text")
      .setCheck("String")
      .appendField("本文");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("メールを送信します。Fromアドレスは使用できません。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_network_sendmail'] = function (block) {
  var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);
  var value_subject = Blockly.JavaScript.valueToCode(block, 'subject', Blockly.JavaScript.ORDER_ATOMIC);
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var code = [
    `let smtp = nodemailer.createTransport({`,
    `host: '192.168.0.201',`,
    `port: 25`,
    `});`,
    `let message = {`,
    `from: 'no-reply@oc.x0.to',`,
    `to: ${value_to},`,
    `subject: ${value_subject},`,
    `text: ${value_text}`,
    `};`,
    `try{`,
    `smtp.sendMail(message, function(error, info){`,
    `if(error){`,
    `alert('送信エラー：' + error.message);`,
    `return;`,
    `}`,
    `console.log('send successfully');`,
    `});`,
    `} catch(e) {alert('Error: ',e);}`,
    ''
  ].join('\n');
  return code;
};

/********************* */
/** WebRTC Web Chat ** */
/********************* */

// skyway.js Library
Blockly.Blocks['ugj_library_skyway'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("WebRTC+SkyWayによるウェブチャット");
    this.setInputsInline(true);
    this.setOutput(true, "Library");
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("skyway.jsをロードし、ウェブチャットができるようにします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_library_skyway'] = function (block) {
  var code = `'./scripts/skyway.js'`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


// WebChat Statement Begin
Blockly.Blocks['ugj_webchat'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("チャットに必要な部品を表示");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("ビデオ画面、チャット入力フォームや黒板を表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_webchat'] = function (block) {
  var code = [
    `const blackboard = document.getElementById('blackboard');`,
    "blackboard.style.display = 'inline-block';",
    `const inputForm = document.getElementById('inputForm');`,
    "inputForm.style.display = 'inline-block';",
    `const inputBox = document.getElementById('inputBox');`,
    "inputBox.focus();",
    "const remoteVideo = document.getElementById('maindisplay');",
    `remoteVideo.style.display = 'inline-block';`,
    "const localVideo = document.getElementById('subdisplay');",
    `localVideo.style.display = 'inline-block';`,
    `var localStream;`,
    ''
  ].join('\n');
  return code;
};
// getUserMedia
Blockly.Blocks['ugj_getusermedia'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ローカルメディアを開始")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("このコンピュータにつながれているメディアデバイスから映像を取得して表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_getusermedia'] = function (block) {
  var code = [
    `navigator.mediaDevices.getUserMedia({video: true, audio: false})`,
    '    .then(stream => {',
    '        localVideo.srcObject = stream;',
    '        localStream = stream;',
    '    }).catch( error => {',
    '        console.error(\'mediaDevice.getUserMedia() error:\', error);',
    '        return;',
    '    });',
    ''
  ].join('\n');
  return code;
};
// SkyWay New Peer
Blockly.Blocks['ugj_skyway_newpeer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("SkyWayサーバーに ID:")
      .appendField(new Blockly.FieldVariable("自分のID"), "my_id")
      // .appendField(new Blockly.FieldTextInput("MyID"), "NAME")
      .appendField("で接続する");
    this.appendStatementInput("do")
      .setCheck(null)
      .appendField("接続したら");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("サーバーにIDを登録して、相手先呼び出しの準備をします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_newpeer'] = function (block) {
  var variable_my_id = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('my_id'), Blockly.Variables.NAME_TYPE);
  // var text_name = block.getFieldValue('NAME');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `const peer = new Peer(${variable_my_id}, {`,
    "    key: window.__SKYWAY_KEY__,",
    "    debug: 3",
    "});",
    "peer.on('open', () => {",
    // '    ugj_blackboardWrite(`SkyWay: "${peer.id}" OK`)',
    `${variable_my_id} = peer.id;`,
    "inputForm.addEventListener('submit', onMakeCall);",
    statements_do,
    "});",
    "peer.on('error', err => alert(err.message));",
    "const onMakeCall = e => {",
    "    e.preventDefault();",
    "    const call = peer.call(inputBox.value, localStream);",
    "    setupCallEventHandlers(call);",
    "    const connect = peer.connect(inputBox.value);",
    "    setupConnectEventHandlers(connect);",
    "    inputBox.value = '';",
    "}",
    ''
  ].join('\n');
  return code;
};
// Catch Call and Connect Request
Blockly.Blocks['ugj_skyway_called'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("チャットに誘われたら応じる");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("接続要求があった場合、チャットを開始する処理です。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_called'] = function (block) {
  var code = [
    "peer.on('call', call => {",
    "    call.answer(localStream);",
    "    setupCallEventHandlers(call);",
    "});",
    "peer.on('connection', connect => {",
    "    setupConnectEventHandlers(connect);",
    "});",
    ''
  ].join('\n');
  return code;
};
// EventHandlers for Call and Connect
Blockly.Blocks['ugj_skyway_events'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("相手のID"), "remote_id")
      .appendField("との接続後にすること");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("チャットの相手との接続後の動作を定義します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_events'] = function (block) {
  var variable_remote_id = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('remote_id'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    "const setupCallEventHandlers = call => call.on('stream', stream => remoteVideo.srcObject = stream);",
    "const setupConnectEventHandlers = connect => {",
    "    inputForm.removeEventListener('submit', onMakeCall);",
    `    ${variable_remote_id} = connect.remoteId;`,
    statements_do,
    "}",
    ''
  ].join('\n');
  return code;
};
// Peer Open
Blockly.Blocks['ugj_skyway_eventopen'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("接続したらすぐ");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("チャット相手との接続が確立したときの動作を決めます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_eventopen'] = function (block) {
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    "    connect.on('open', () => {",
    "        inputForm.addEventListener('submit', onSendMsg)",
    statements_do,
    "    });",
    ''
  ].join('\n');
  return code;
};
// Peer Data Receive
Blockly.Blocks['ugj_skyway_eventdata'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("相手の")
      .appendField(new Blockly.FieldVariable("発言"), "data")
      .appendField("を受けとったら");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("チャット相手の発言を受信したときの動作です。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_eventdata'] = function (block) {
  var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    "    connect.on('data', data => {",
    `    ${variable_data} = data;`,
    statements_do,
    "    });",
    ''
  ].join('\n');
  return code;
};
// Send Message
Blockly.Blocks['ugj_skyway_eventsend'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("入力フィールドの")
      .appendField(new Blockly.FieldVariable("内容"), "data")
      .appendField("を送信するとき");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("入力フィールドで送信が発生したときの動作を決めます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_skyway_eventsend'] = function (block) {
  var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    "    const onSendMsg = () => {",
    `        ${variable_data} = inputBox.value;`,
    `        connect.send(${variable_data});`,
    "        inputBox.value = '';",
    statements_do,
    "    }",
    ''
  ].join('\n');
  return code;
};



/** Utilitiy Blocks ***********************************************************************************************/

/************ */
/** File Read */
/************ */
Blockly.Blocks['ugj_file_readsync'] = {
  init: function () {
    this.appendValueInput("filename")
      .setCheck("String")
      .appendField("ファイル");
    this.appendDummyInput()
      .appendField("の内容：符号化")
      .appendField(new Blockly.FieldDropdown([["utf8", "utf8"], ["base64", "base64"], ["binary", "binary"]]), "encoding");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("あなたのホーム/ocogeディレクトリ内にあるファイルの内容を取得します。「符号化」は、テキストファイルでは通常「utf8」を選択します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_file_readsync'] = function (block) {
  var value_filename = Blockly.JavaScript.valueToCode(block, 'filename', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_encoding = block.getFieldValue('encoding');
  let filepath = appDocRoot + value_filename.replace(/\'/g, '');
  var code = `fs.readFileSync('${filepath}', '${dropdown_encoding}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/********************************* */
/** Save TextData to Local Storage */
/********************************* */
Blockly.Blocks['ugj_localstorage_save'] = {
  init: function () {
    this.appendValueInput("keyValue")
      .setCheck("String");
    this.appendValueInput("keyName")
      .setCheck("String")
      .appendField("をローカルストレージ");
    this.appendDummyInput()
      .appendField("に保存する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("テキストデータをローカルストレージに名前を付けて保存します。名前は半角アルファベットと数字だけで指定してください。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_localstorage_save'] = function (block) {
  var value_keyvalue = Blockly.JavaScript.valueToCode(block, 'keyValue', Blockly.JavaScript.ORDER_ATOMIC);
  var value_keyname = Blockly.JavaScript.valueToCode(block, 'keyName', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `localStorage.setItem(${value_keyname}, ${value_keyvalue});\n`;
  return code;
};
/*********************************** */
/** Load Textdata from Local Storage */
/*********************************** */
Blockly.Blocks['ugj_localstorage_load'] = {
  init: function () {
    this.appendValueInput("keyName")
      .setCheck("String")
      .appendField("ローカルストレージ");
    this.appendDummyInput()
      .appendField("の内容");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("ローカルストレージからテキストデータを読み込みます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_localstorage_load'] = function (block) {
  var value_keyname = Blockly.JavaScript.valueToCode(block, 'keyName', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `localStorage.getItem(${value_keyname})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/**************************** */
/** Key List in Local Storage */
/**************************** */
Blockly.Blocks['ugj_localstorage_keylist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ローカルストレージに保存されているデータの一覧");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("ローカルストレージに保存されているキーの一覧を取得します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_localstorage_keylist'] = function (block) {
  var functionName = Blockly.JavaScript.provideFunction_(
    'localStorage_getKeyList',
    [
      'const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = () => {',
      'let listArray = [];',
      'for (let i=0; i<localStorage.length; i++) {',
      `listArray.push(localStorage.key(i));`,
      '}',
      `return listArray.join('\\n');`,
      '}'
    ]
  );
  var code = `${functionName}()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


/********************** */
/** Question and Answer */
/********************** */
Blockly.Blocks['ugj_event_answer'] = {
  init: function () {
    this.appendValueInput("question")
      .setCheck("String");
    // this.appendValueInput("sec")
    //     .setCheck("Number")
    //     .appendField("と");
    this.appendDummyInput()
      .appendField("ときいて")
      .appendField(new Blockly.FieldVariable("答え"), "answer")
      .appendField("を待つ");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("質問をして答えを待ちます。入力欄でキーボードのエンターキーが入力されるか、チェックマークボタンが押されると実行されます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_event_answer'] = function (block) {
  var value_question = Blockly.JavaScript.valueToCode(block, 'question', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_sec = Blockly.JavaScript.valueToCode(block, 'sec', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_answer = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('answer'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `ugj_fukidashi(${value_question}, 0);`,
    `inputForm = document.getElementById('inputForm');`,
    `inputBox = document.getElementById('inputBox');`,
    "inputForm.style.display = 'inline-block'",
    "inputBox.focus();",
    "const inputFunc = async () => { ",
    "  if (inputBox.value.length > 0) {",
    `    ${variable_answer} = inputBox.value;`,
    '    inputForm.style.display = "none"',
    "    inputBox.value = '';",
    "    document.getElementById('canvas').getContext('2d').clearRect(ugj_fdRecentBox.x,ugj_fdRecentBox.y,ugj_fdRecentBox.w,ugj_fdRecentBox.h);",
    statements_do,
    "    console.log('Removing listener...');",
    "    inputForm.removeEventListener('submit', inputFunc );",
    "  }",
    "}",
    "inputForm.addEventListener('submit', inputFunc );",
    ''
  ].join('\n');
  return code;
};

/************ */
/** SpawnSync */
/************ */
Blockly.Blocks['ugj_spawnsync'] = {
  init: function () {
    this.appendValueInput("childprocess")
      .setCheck("shcmd")
      .appendField("外部プログラム");
    this.appendDummyInput()
      .appendField("を同期的に実行して")
      .appendField(new Blockly.FieldVariable("実行結果"), "data")
      .appendField("を受け取る");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("外部プログラムを実行して子プロセスを生成し、子プロセスが終了するまで待ちます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_spawnsync'] = function (block) {
  var value_childprocess = Blockly.JavaScript.valueToCode(block, 'childprocess', Blockly.JavaScript.ORDER_NONE);
  var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_data} = require('child_process').spawnSync(${value_childprocess}).stdout.toString();\n`;
  // var code = `${variable_data} = require('child_process').execFileSync(${value_childprocess});\n`;
  return code;
};

/*********** */
/** Spawn ** */
/*********** */
Blockly.Blocks['ugj_spawn'] = {
  init: function () {
    this.appendValueInput("childprocess")
      .setCheck("shcmd")
      .appendField("外部プログラム");
    this.appendDummyInput()
      .appendField("を非同期に実行して")
      .appendField(new Blockly.FieldVariable("データストリーム"), "data")
      .appendField("を受け取る");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("外部プログラムを実行して子プロセスを生成します。データを受け取る毎にステートメントが実行されます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_spawn'] = function (block) {
  var value_childprocess = Blockly.JavaScript.valueToCode(block, 'childprocess', Blockly.JavaScript.ORDER_NONE);
  var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `let child = require('child_process').spawn(${value_childprocess});`,
    `elec.addChild(child);`,
    "child.stderr.on('data', data => { console.error(data.toString()) })",
    "child.stdout.on('data', async data => {",
    `${variable_data} = data.toString();`,
    statements_do,
    "})",
    "child.on('close', (code, signal) => { if (code !== 0) { console.error(`process exited with code ${code}, signal ${signal}`)}",
    "})",
    ''
  ].join("\n");
  return code;
};
/************************** */
/** Child shell commands ** */
/************************** */
// gesture_sensor.py
Blockly.Blocks['ugj_child_gesture'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ジェスチャー");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
 this.setTooltip("ジェスチャーセンサー Paj7620 (GrovePi-Python)");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_gesture'] = function(block) {
  var code = `'python3', ['./scripts/gesture.py']`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// face.py
Blockly.Blocks['ugj_child_facepy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("face.py：カメラ画像を表示")
        .appendField(new Blockly.FieldDropdown([["しない"," "], ["する","-w"]]), "win");
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
 this.setTooltip("OpenCVによる顔認識 Python2スクリプト - 顔のX座標を返します。");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_facepy'] = function(block) {
  var dropdown_win = block.getFieldValue('win');
  var code = `'python', ['./scripts/face.py', '${dropdown_win}']`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// open jtalk
Blockly.Blocks['ugj_child_openjtalk'] = {
  init: function () {
    this.appendValueInput("talk")
      .setCheck("String");
    this.appendDummyInput()
      .appendField("とおしゃべりする：声の種類")
      .appendField(new Blockly.FieldDropdown([["M001(男性)", "m001"], ["Takumi(男性)", "takumi"], ["Mei(女性)", "mei"], ["f01(女性)", "f01"]]), "voice");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("日本語音声合成プログラム「openJTalk」を使用してしゃべります。声の種類を選べます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_openjtalk'] = function (block) {
  var value_talk = Blockly.JavaScript.valueToCode(block, 'talk', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_voice = block.getFieldValue('voice');
  // var functionName = Blockly.JavaScript.provideFunction_(
  //   'fixText',
  //   ['const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = text => {return text;}']
  // );
  var code = `'echo ' + ${value_talk} + ' | ./bin/open_jtalk/open_jtalk -m ./bin/open_jtalk/htsvoices/${dropdown_voice}.htsvoice -x ./bin/open_jtalk/open_jtalk_dic_utf_8-1.11 -ow /dev/stdout | aplay --quiet', { shell: true }`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// oled.py
Blockly.Blocks['ugj_child_oledtext'] = {
  init: function () {
    this.appendValueInput("line1")
      .setCheck("String")
      .appendField("OLEDにテキストを描画：1行目");
    this.appendValueInput("line2")
      .setCheck("String")
      .appendField("2行目");
    this.appendValueInput("line3")
      .setCheck("String")
      .appendField("3行目");
    this.appendValueInput("line4")
      .setCheck("String")
      .appendField("4行目");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("I2C接続したSSD1306ディスプレイ(128x64)にテキストを描画します。最大4行。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_oledtext'] = function (block) {
  var value_line1 = Blockly.JavaScript.valueToCode(block, 'line1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_line2 = Blockly.JavaScript.valueToCode(block, 'line2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_line3 = Blockly.JavaScript.valueToCode(block, 'line3', Blockly.JavaScript.ORDER_ATOMIC);
  var value_line4 = Blockly.JavaScript.valueToCode(block, 'line4', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `'python', ['./scripts/oled.py', ${value_line1}, ${value_line2}, ${value_line3}, ${value_line4}]`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// fswebcam
Blockly.Blocks['ugj_child_fswebcam'] = {
  init: function () {
    this.appendValueInput("filename")
      .setCheck("String")
      .appendField("fswebcamで写真を撮り、ファイル");
    this.appendDummyInput()
      .appendField("に保存");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("fswebcam");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_fswebcam'] = function (block) {
  var value_filename = Blockly.JavaScript.valueToCode(block, 'filename', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `'fswebcam', ['-r', '480x360', '${appDocRoot}' + ${value_filename}]`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// Julius
Blockly.Blocks['ugj_child_julius'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Julius");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("音声認識エンジン \"Julius\"");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_julius'] = function (block) {
  var code = "'./bin/julius/julius-simple', ['-C', './bin/julius/dictation-kit-4.5/assistant.jconf', '-C', './bin/julius/dictation-kit-4.5/am-gmm.jconf', '-quiet']";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// irrp.py - pigpioによる赤外線リモコンの学習
Blockly.Blocks['ugj_child_irrecord'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("でリモコンの信号を受信");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("受信した赤外線リモコンの信号を文字列として取得します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_irrecord'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `'python3', ['./scripts/irrp.py', '-r', '-g', '${value_gpio}', 'signal', '--post', '130']`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// 送信
Blockly.Blocks['ugj_child_irplayback'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendValueInput("signal")
      .setCheck("String")
      .appendField("からリモコン信号");
    this.appendDummyInput()
      .appendField("を送信");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("学習済みの赤外線リモコンの信号を送信します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_irplayback'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  var value_signal = Blockly.JavaScript.valueToCode(block, 'signal', Blockly.JavaScript.ORDER_ATOMIC);//.replace('{','\\{').replace('}','\\}').replace(/"/g,'\\"').replace(/ /g,'\\ ')
  var code = `'python3', ['./scripts/irrp.py', '-p', '-g', '${value_gpio}', '--irdata', ${value_signal}, 'signal']`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// ハッシュ生成
Blockly.Blocks['ugj_child_irrcvr'] = {
  init: function () {
    this.appendValueInput("gpio")
      .setCheck("Number")
      .appendField("GPIO");
    this.appendDummyInput()
      .appendField("で受信したリモコン信号から識別コードを生成");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("受信した赤外線リモコンの信号からハッシュを生成します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_irrcvr'] = function (block) {
  var value_gpio = Blockly.JavaScript.valueToCode(block, 'gpio', Blockly.JavaScript.ORDER_ATOMIC);
  // var code = `'python3', ['./scripts/irrcvr.py', '-g', '${value_gpio}']`;
  var code = `'./bin/ir_hash/ir_hash', ['${value_gpio}']`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// face.py
// Blockly.Blocks['ugj_child_facepy'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("face.py");
//     this.setInputsInline(true);
//     this.setOutput(true, null);
//     this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
//     this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
//     this.setTooltip("opencv4nodejsによる顔認識");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['ugj_child_facepy'] = function (block) {
//   var code = "'node', ['./face.js']";
//   return [code, Blockly.JavaScript.ORDER_NONE];
// };

// Python との連携のひな型
Blockly.Blocks['ugj_child_testpy'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("testpy");
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_testpy'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "'py', ['-2', 'test.py']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// 外部 Node との連携のひな型
Blockly.Blocks['ugj_child_testjs'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("testjs");
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_testjs'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "'node', ['test.js']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
// Debug *Danger*
Blockly.Blocks['ugj_child_debug'] = {
  init: function () {
    this.appendValueInput("cmd")
      .setCheck("String")
      .appendField("cmd");
    this.appendValueInput("opt")
      .setCheck("Array")
      .appendField("opt");
    this.setInputsInline(true);
    this.setOutput(true, "shcmd");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("さわるなきけん");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_child_debug'] = function (block) {
  var value_cmd = Blockly.JavaScript.valueToCode(block, 'cmd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_opt = Blockly.JavaScript.valueToCode(block, 'opt', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${value_cmd}, ${value_opt}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/******************* */
/** Show Blackboard ** */
/******************* */
Blockly.Blocks['ugj_blackboard_show'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("黒板を表示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("文字を表示するための専用エリアを表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_blackboard_show'] = function (block) {
  var code = "document.getElementById('blackboard').style.display = 'inline-block';\n";
  return code;
};

/************************* */
/** Write text to Blackboard */
/************************* */
Blockly.Blocks['ugj_blackboard_write'] = {
  init: function () {
    this.appendValueInput("text")
      .setCheck("String")
      .appendField("黒板に");
    this.appendValueInput("color")
      .setCheck("Colour")
      .appendField("を表示 | 色:");
    this.appendDummyInput()
      .appendField("|")
      .appendField(new Blockly.FieldDropdown([["普通", "normal"], ["斜体", "italic"]]), "style")
      .appendField("|")
      .appendField(new Blockly.FieldDropdown([["新しい行を追加", "new"], ["最後の行を上書き", "last"]]), "line");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("黒板に文字を表示します。次の行に追加する他、最後の行を書き換えることもできます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_blackboard_write'] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_style = block.getFieldValue('style');
  var dropdown_line = block.getFieldValue('line');
  var funcAppendDivName = Blockly.JavaScript.provideFunction_(
    'appendDiv',
    ['const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = termEl => {',
      `let el = document.createElement('div');`,
      `termEl.appendChild(el);`,
      `return el;`,
      '}']
  );
  var funcTermWriteName = Blockly.JavaScript.provideFunction_(
    'blackboardWrite',
    ['const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = (text, color, style, line) => {',
      `let termEl = document.getElementById('blackboard')`,
      'let el = null;',
      `if (line == 'new') {`,
    `el = ${funcAppendDivName}(termEl);`,
      `} else {`,
      `el = termEl.lastChild;`,
      `if (el === null) {`,
    `el = ${funcAppendDivName}(termEl);`,
      `}`,
      `}`,
      `el.style.color = color;`,
      `el.style.fontStyle = style;`,
      // `el.innerHTML = ugj_htmlEntities(text);`,
      `el.innerHTML = text;`,
      `termEl.scrollTop = termEl.scrollHeight;`,
      '}//#']
  );
  value_text = ugj_htmlEntities(value_text);
  var code = [
    `${funcTermWriteName}(${value_text}, ${value_color}, '${dropdown_style}', '${dropdown_line}');`,
    '',
  ].join('\n');
  return code;
};

/******************** */
/** Clear Blackboard ** */
/******************** */
Blockly.Blocks['ugj_clearblackboard'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("黒板をクリア");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("黒板をきれいにします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_clearblackboard'] = function (block) {
  var code = `document.getElementById('blackboard').innerHTML = '';\n`;
  return code;
};

/************************* */
/** Get BlackBoard Content */
/************************* */
Blockly.Blocks['ugj_blackboard_content'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("黒板の内容");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("黒板の内容をプレーンテキストで取得します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_blackboard_content'] = function (block) {
  var code = `document.getElementById('blackboard').innerText`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/************* */
/** Soft Sleep */
/************* */
Blockly.Blocks['ugj_sleep'] = {
  init: function () {
    this.appendValueInput("sec")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("秒待つ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("指定した秒数だけ処理を中断します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_sleep'] = function (block) {
  var value_sec = Blockly.JavaScript.valueToCode(block, 'sec', Blockly.JavaScript.ORDER_ATOMIC);
  var functionName = Blockly.JavaScript.provideFunction_(
    'sleep',
    ['const ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = milisec =>',
      'new Promise(r => setTimeout(r, milisec));']
  );
  var code = `await ${functionName}(${value_sec}*1000);`;
  return code;
};

/********************* */
/** Carriage Return ** */
/********************* */
Blockly.Blocks['ugj_text_cr'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("CR");
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.setTooltip("特殊記号（キャリッジリターン）");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_text_cr'] = function (block) {
  var code = "'\\r'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
/*************** */
/** Line Feed ** */
/*************** */
Blockly.Blocks['ugj_text_lf'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LF");
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.setTooltip("特殊記号（ラインフィード）");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_text_lf'] = function (block) {
  var code = "'\\n'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
/******* */
/** Null */
/******* */
Blockly.Blocks['ugj_text_null'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("NULL");
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.setTooltip("特殊記号（ヌル文字）");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_text_null'] = function (block) {
  var code = "'\\0'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
/********* */
/** Cursor */
/********* */
Blockly.Blocks['ugj_text_cursor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("カーソル");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    this.setColour(Blockly.Msg.TEXTS_HUE);
 this.setTooltip("特殊記号（カーソル）");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_text_cursor'] = function(block) {
  var code = "'&#9611;'";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/******************/
/** Set Interval **/
/******************/
Blockly.Blocks['ugj_set_interval'] = {
  init: function () {
    this.appendValueInput("sec")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("秒ごとにくり返す");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("非同期で繰り返し処理を行います（停止ボタンまたは停止ブロックで停止）。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_set_interval'] = function (block) {
  var value_sec = Blockly.JavaScript.valueToCode(block, 'sec', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    'let interval = setInterval( async () => {',
    statements_do,
    `}, ${value_sec}*1000);`,
    ''
  ].join('\n');
  return code;
};
/******************** */
/** Clear Interval ** */
/******************** */
Blockly.Blocks['ugj_special_clearinterval'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("繰り返しを停止する");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("非同期の繰り返し処理を停止します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_special_clearinterval'] = function (block) {
  var code = 'clearInterval(interval);\n';
  return code;
};
/********+********/
/** Set Timeout **/
/********+********/
Blockly.Blocks['ugj_set_timeout'] = {
  init: function () {
    this.appendValueInput("sec")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("秒待ってから");
    this.appendStatementInput("do")
      .setCheck(null);
    // this.appendDummyInput()
    //   .appendField("この下は待たずに実行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("指定した秒数だけ待ってから実行します。");//内側のブロック部を 外側下に接続したものは待たずに直ちに実行されます（非同期動作）。
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_set_timeout'] = function (block) {
  var value_sec = Blockly.JavaScript.valueToCode(block, 'sec', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = `let interval = setTimeout(async () => {\n${statements_do}}, ${value_sec}*1000);\n`;
  return code;
};

/**************************** */
/** Dinamic Load JS Libraries */
/**************************** */
Blockly.Blocks['ugj_library_load'] = {
  init: function () {
    this.appendValueInput("lib")
      .setCheck("Library");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    // this.setStartHat(true);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("ライブラリをロードします。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_library_load'] = function (block) {
  var value_lib = Blockly.JavaScript.valueToCode(block, 'lib', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `let scriptEl = document.createElement('script');`,
    `scriptEl.onload = async ev => {`,
    `${statements_do}`,
    `};`,
    `scriptEl.src = ${value_lib};`,
    `document.getElementsByTagName('head')[0].appendChild(scriptEl);`,
    ''
  ].join('\n');
  return code;
};

/******************* */
/** Create Button ** */
/******************* */
Blockly.Blocks['ugj_control_button'] = {
  init: function () {
    this.appendValueInput("label")
      .setCheck("String")
      .appendField("ボタンを作成：ラベル");
    this.appendValueInput("textcolor")
      .setCheck("Colour")
      .appendField("文字色");
    this.appendValueInput("bgcolor")
      .setCheck("Colour")
      .appendField("背景色");
    this.appendValueInput("title")
      .setCheck("String")
      .appendField("ツールチップ");
    this.appendStatementInput("do")
      .setCheck(null)
      .appendField("クリックしたら (")
      .appendField(new Blockly.FieldVariable("ツールチップ"), "title")
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_SPECIAL_HUE);
    this.setTooltip("ディスプレイカラムにボタンを作成し、クリックのイベントリスナを定義します。テキストデータをひとつ、\"title\"属性値として設定・取り出しが可能です。保存したデータはマウスオーバーで確認できます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_control_button'] = function (block) {
  var value_label = Blockly.JavaScript.valueToCode(block, 'label', Blockly.JavaScript.ORDER_ATOMIC);
  var value_textcolor = Blockly.JavaScript.valueToCode(block, 'textcolor', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bgcolor = Blockly.JavaScript.valueToCode(block, 'bgcolor', Blockly.JavaScript.ORDER_ATOMIC);
  var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_title = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('title'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = [
    `( async () => {`,
    `let el = document.createElement('button');`,
    `el.innerText = ${value_label};`,
    `el.style.color = ${value_textcolor};`,
    `el.style.backgroundColor = ${value_bgcolor};`,
    `el.title = ${value_title};`,
    `el.className = 'toolbarButton ocgButton';`,
    `document.getElementById('dispColumn').appendChild(el);`,
    `el.addEventListener('click', async ev => {`,
    `${variable_title} = ev.currentTarget.title;`,
    statements_do,
    `});`,
    `})();`,
    '',
  ].join('\n');
  return code;
};


/** Unused Blocks **********************************************************************************************/

/** Junk: ごみ置き場　廃止になったブロックを、必要なワークスペースの修正が完了するまで保持します。 *********************/

Blockly.Blocks['ugj_gpio_startstop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("dummy");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_startstop'] = function (block) {
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

/************ */
/** Fetch API */
/************ */
Blockly.Blocks['ugj_network_fetch'] = {
  init: function () {
    this.appendValueInput("url")
      .setCheck(null);
    this.appendDummyInput()
      .appendField("にリクエストを送信し、")
      .appendField(new Blockly.FieldVariable("レスポンス"), "response")
      .appendField("を取得する");
    this.appendStatementInput("do")
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_NETWORK_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_network_fetch'] = function (block) {
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_response = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('response'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do'); var code = [
    `fetch(${value_url})`,
    `  .then(response => {`,
    `    if (response.ok) {`,
    `      return response.text();`,
    `    } else {`,
    `      return 'HTTP Status: ' + response.status;`,
    `    }`,
    `  })`,
    `  .then(body => {`,
    `    ${variable_response} = body;`,
    statements_do,
    `  });`,
    ''
  ].join('\n');
  return code;
};


/********************* */
/** Print to Blackboard **/
/********************* */
Blockly.Blocks['ugj_texts_print'] = {
  init: function () {
    this.appendValueInput("text")
      .setCheck(null)
    this.appendDummyInput()
      .appendField("を表示");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("テキストや数字などを黒板に表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_texts_print'] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `ugj_blackboardWrite(${value_text});\n`;
  return code;
};

/************************************** */
/** Print Colorized Text to Blackboard ** */
/************************************** */
Blockly.Blocks['ugj_text_printcolored'] = {
  init: function () {
    this.appendValueInput("text")
      .setCheck(null)
      .appendField("黒板に");
    this.appendValueInput("color")
      .setCheck("Colour")
      .appendField("を");
    this.appendDummyInput()
      .appendField("色で表示");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("テキストや数字などを黒板に色付きで表示します。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_text_printcolored'] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `ugj_blackboardWrite(${value_text}, ${value_color});\n`;
  return code;
};

/******************************** */
/** Open and Close Serial Port ** */
/******************************** */
Blockly.Blocks['ugj_serial_openclose'] = {
  init: function () {
    this.appendValueInput("tty")
      .setCheck("String")
      .appendField("シリアルポート");
    this.appendDummyInput()
      .appendField("を速度")
      .appendField(new Blockly.FieldDropdown([["9600", "9600"], ["19200", "19200"], ["115200", "115200"]]), "baud")
      .appendField("bpsで開く");
    this.appendStatementInput("do")
      .setCheck(null);
    this.appendDummyInput()
      .appendField("終わったらシリアルポートを閉じる");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.UGJ_GPIO_HUE);
    this.setTooltip("シリアルデバイスとの接続を開き、用事が終わったら閉じます。");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_serial_openclose'] = function (block) {
  var value_tty = Blockly.JavaScript.valueToCode(block, 'tty', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_baud = block.getFieldValue('baud');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  // TODO: Assemble JavaScript into code variable.
  var code = [
    `let serhand = pi.serial_open(${value_tty}, ${dropdown_baud}, 0);`,
    statements_do,
    'pi.serial_close(serhand);',
    ""
  ].join('\n');
  return code;
};

Blockly.Blocks['ugj_gpio_i2copenclose'] = {
  init: function() {
    this.appendValueInput("i2c_addr")
        .setCheck("String")
        .appendField("アドレス");
    this.appendDummyInput()
        .appendField("の I2C デバイスを開く");
    this.appendStatementInput("do")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("デバイスを閉じる");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("I2C接続されたデバイスと通信を行います。");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['ugj_gpio_i2copenclose'] = function(block) {
  var value_i2c_addr = Blockly.JavaScript.valueToCode(block, 'i2c_addr', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  // TODO: Assemble JavaScript into code variable.
  var code = statements_do;
  return code;
};