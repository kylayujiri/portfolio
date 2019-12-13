var myTimeZone = "America/New_York";
var mode = 0;

function startTime() {
    var today = new Date();
    var convertedToday = today.toLocaleString("en-US", {timeZone: myTimeZone});
    convertedToday = new Date(convertedToday);
    var h = convertedToday.getHours();
    var m = convertedToday.getMinutes();
    var s = convertedToday.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);
    document.getElementById('txt').innerHTML =
    h + " : " + m + " : " + s;
    var split = myTimeZone.split("/");
    split[1] = split[1].replace("_", " ");
    document.getElementById('timezone').innerHTML = split[1];
    var t = setTimeout(startTime, 500);

    if (mode == 0) { // regular mode
      document.getElementById('mode-toggle').innerHTML = "Vibrant";
    } else {
      document.getElementById('mode-toggle').innerHTML = "Original";

      // 24 hours / 3 = 8 hours per color
      // 0 - 8 = red, 8-16 = green, 16-24 = blue

      // 60 minutes / 16 = 3.75
      // 60 / 32 = 1.875
      // 0 1 2 3 4 5 6 7 8 9 a b c d e f
      // 0 1 2 3 4 5 6 7 8 9 a b c d e f

      var r = 0;
      var g = 0;
      var b = 0;

      if (h >= 00 && h < 08) {
        r = "ff";
        g = m;
        b = s;
      } else if (h >= 08 && h < 16) {
        g = "ff";
        r = m;
        b = s;
      } else {
        b = "ff";
        r = m;
        g = s;
      }

      h = r;
      m = g;
      s = b;
    }


    setBackground("#" + h + m + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function setBackground(color) {
    var myBG = document.getElementById('background');
    myBG.style.backgroundColor = color;
    document.getElementById('hex').innerHTML = color;

    var buttons = document.getElementsByClassName("timeZoneButton");
    for (var i=0; i < buttons.length; i++) {
      buttons[i].style.color = color;
    }
}

function setTimeZone(newTimeZone) {
  myTimeZone = newTimeZone;
}

function toggleMode() {
  if (mode == 0) {
    mode = 1;
  } else {
    mode = 0;
  }
}
