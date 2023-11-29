function Response(status, msg) {
  this.ok = status;
  this.data = msg;
}

module.exports = { Response };
