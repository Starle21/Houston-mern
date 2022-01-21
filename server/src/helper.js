const AbortedFlights = (module.exports = {
  aborted: false,
  name: "",
  abort: function (name) {
    this.aborted = true;
    this.name = name;
  },
  connected: false,
});
