/** PIGPIO デーモンを Node.js から利用するモジュール ** */
/** 関数名・書式は Python Interface に準拠 ******************* */

#include <napi.h>
#include <pigpiod_if2.h>
#include <unistd.h>
#include <string>

using namespace Napi;

int pi = 0;

Value Usleep(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 1)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  usleep(info[0].As<Number>().DoubleValue());

  return env.Null();
}


// pigpio 初期化
Value Start(const CallbackInfo& info)
{
  Env env = info.Env();
  pi = pigpio_start(0, 0);
  return env.Null();
}
// リモート
Value StartRemote(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsString() || !info[1].IsString())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string addrStr = info[0].As<String>().Utf8Value();
  std::string portStr = info[1].As<String>().Utf8Value();

  pi = pigpio_start(&addrStr[0], &portStr[0]);

  return env.Null();
}

// pigpio 後始末
Value Stop(const CallbackInfo& info)
{
  Env env = info.Env();
  pigpio_stop(pi);
  return env.Null();
}

// GPIO 端子のモードを設定
Value SetMode(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int gpio = info[0].As<Number>().DoubleValue();
  unsigned int mode = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_mode(pi, gpio, mode)
  );
}

// GPIO 端子のモードを取得
Value GetMode(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 1)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int gpio = info[0].As<Number>().DoubleValue();

  return Number::New(env,
    get_mode(pi, gpio)
  );
}

// GPIOの内部プルアップ/ダウン抵抗の設定/クリア
Value SetPullUpDown(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int gpio = info[0].As<Number>().DoubleValue();
  unsigned int pud = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_pull_up_down(pi, gpio, pud)
  );
}

// GPIOの電圧を読む
Value Read(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 1)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int gpio = info[0].As<Number>().DoubleValue();

  return Number::New(env,
    gpio_read(pi, gpio)
  );
}

// GPIO の電圧をセットする
Value Write(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int gpio = info[0].As<Number>().DoubleValue();
  unsigned int value = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    gpio_write(pi, gpio, value)
  );

}

// サーボパルス幅をセットする
Value SetServoPulsewidth(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int user_gpio = info[0].As<Number>().DoubleValue();
  unsigned int pulsewidth = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_servo_pulsewidth(pi, user_gpio, pulsewidth)
  );
}

// PWM周波数を設定する
Value SetPwmFrequency(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int user_gpio = info[0].As<Number>().DoubleValue();
  unsigned int frequency = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_PWM_frequency(pi, user_gpio, frequency)
  );
}

// PWMのレンジを設定する
Value SetPwmRange(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int user_gpio = info[0].As<Number>().DoubleValue();
  unsigned int range = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_PWM_range(pi, user_gpio, range)
  );
}

// PWMのデューティ比を指定して出力を開始する
Value SetPwmDutycycle(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int user_gpio = info[0].As<Number>().DoubleValue();
  unsigned int dutycycle = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    set_PWM_dutycycle(pi, user_gpio, dutycycle)
  );
}

// シリアルポートを開く
Value SerialOpen(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 3)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsString() || !info[1].IsNumber() || !info[2].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string ser_tty = info[0].As<String>().Utf8Value();
  // char *c = new char[ser_tty.size()+1];
  // std::strcpy(c, ser_tty.c_str());
  // &ser_tty[0] で参照できるらしいけど危険？

  unsigned int baud = info[1].As<Number>().DoubleValue();
  unsigned int ser_flags = info[2].As<Number>().DoubleValue();

  return Number::New(env,
    serial_open(pi, &ser_tty[0], baud, ser_flags)
  );
}

// シリアルポートを閉じる
Value SerialClose(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 1)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();

  return Number::New(env,
    serial_close(pi, handle)
  );
}

// シリアルデバイスからデータを読む
Value SerialRead(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();
  unsigned int count = info[1].As<Number>().DoubleValue();
  char buf[count+1];
  for (unsigned int i = 0; i <= count; i++)
  {
    buf[i] = 0;
  }
  serial_read(pi, handle, buf, count);
  return String::New(env,
    buf
  );
}

// シリアルデバイスにバイト列を書き込む(data: string)
Value SerialWrite(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsString())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();
  std::string buf = info[1].As<String>().Utf8Value();

  unsigned int count = buf.length();

  return Number::New(env,
    serial_write(pi, handle, &buf[0], count)
  );
}

// I2Cバスアドレスのデバイスのハンドルを返す
Value I2cOpen(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 3)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int i2c_bus = info[0].As<Number>().DoubleValue();
  unsigned int i2c_addr = info[1].As<Number>().DoubleValue();
  unsigned int i2c_flags = info[2].As<Number>().DoubleValue();

  return Number::New(env,
    i2c_open(pi, i2c_bus, i2c_addr, i2c_flags)
  );
}

// オープン済みI2Cハンドルを閉じる
Value I2cClose(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 1)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();

  return Number::New(env,
    i2c_close(pi, handle)
  );
}

// I2Cハンドルに関連付けられているデバイスの指定されたレジスタに1バイトを書き込む
Value I2cWriteByteData(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 3)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();
  unsigned int i2c_reg = info[1].As<Number>().DoubleValue();
  unsigned int bVal = info[2].As<Number>().DoubleValue();

  return Number::New(env,
    i2c_write_byte_data(pi, handle, i2c_reg, bVal)
  );
}

// I2Cハンドルに関連付けられているデバイスの指定されたレジスタから1バイトを読み込む
Value I2cReadByteData(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();
  unsigned int i2c_reg = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    i2c_read_byte_data(pi, handle, i2c_reg)
  );
}

// I2Cハンドルに関連付けられているデバイスの指定されたレジスタから単一の16ビットワードを読み取る
Value I2cReadWordData(const CallbackInfo& info)
{
  Env env = info.Env();
  if (info.Length() < 2)
  {
    TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsNumber() || !info[1].IsNumber())
  {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  unsigned int handle = info[0].As<Number>().DoubleValue();
  unsigned int i2c_reg = info[1].As<Number>().DoubleValue();

  return Number::New(env,
    i2c_read_word_data(pi, handle, i2c_reg)
  );
}

Object
Init(Env env, Object exports)
{
  exports.Set(String::New(env, "usleep"), Function::New(env, Usleep));
  exports.Set(String::New(env, "start"), Function::New(env, Start));
  exports.Set(String::New(env, "start_remote"), Function::New(env, StartRemote));
  exports.Set(String::New(env, "stop"), Function::New(env, Stop));
  exports.Set(String::New(env, "set_mode"), Function::New(env, SetMode));
  exports.Set(String::New(env, "get_mode"), Function::New(env, GetMode));
  exports.Set(String::New(env, "set_pull_up_down"), Function::New(env, SetPullUpDown));
  exports.Set(String::New(env, "read"), Function::New(env, Read));
  exports.Set(String::New(env, "write"), Function::New(env, Write));
  exports.Set(String::New(env, "set_servo_pulsewidth"), Function::New(env, SetServoPulsewidth));
  exports.Set(String::New(env, "set_PWM_frequency"), Function::New(env, SetPwmFrequency));
  exports.Set(String::New(env, "set_PWM_range"), Function::New(env, SetPwmRange));
  exports.Set(String::New(env, "set_PWM_dutycycle"), Function::New(env, SetPwmDutycycle));
  exports.Set(String::New(env, "serial_open"), Function::New(env, SerialOpen));
  exports.Set(String::New(env, "serial_close"), Function::New(env, SerialClose));
  exports.Set(String::New(env, "serial_read"), Function::New(env, SerialRead));
  exports.Set(String::New(env, "serial_write"), Function::New(env, SerialWrite));
  exports.Set(String::New(env, "i2c_open"), Function::New(env, I2cOpen));
  exports.Set(String::New(env, "i2c_close"), Function::New(env, I2cClose));
  exports.Set(String::New(env, "i2c_write_byte_data"), Function::New(env, I2cWriteByteData));
  exports.Set(String::New(env, "i2c_read_byte_data"), Function::New(env, I2cReadByteData));
  exports.Set(String::New(env, "i2c_read_word_data"), Function::New(env, I2cReadWordData));
  return exports;
}

NODE_API_MODULE( ocoge_pigpiod, Init )