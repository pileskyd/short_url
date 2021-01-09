const colors = require("colors/safe");

class Logger {
  error(...data) {
    console.error(colors.red(colors.bold("⚠ Error:")), ...data, "🔴");
  }
  
  log(...data) {
    console.log(colors.green(colors.bold("# Log:")), ...data, "🟢");
  }

  success(...data) {
    console.log(colors.green(colors.bold("✔ Success:")), ...data, "🟢");
  }

  warn(...data) {
    console.warn(colors.yellow(colors.bold("⚠ Warn:")), ...data, "🟡");
  }
}

module.exports = new Logger();
