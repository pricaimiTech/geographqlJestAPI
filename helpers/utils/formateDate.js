var moment = require("moment");

export function formatDate(days) {
  var formatDate = "";
  try {
    var orderDate = moment().add(days, "d");
    formatDate = orderDate.format("YYYY-MM-DD") + "T00:00:00.000";
  } catch (e) {
    console.log(e);
  }
  return formatDate;
}
