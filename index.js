$(document).ready(() => {
  var state = "off";
  var interval,
    session = "active";

  $("#break-increment").click(() => {
    if (state === "on") return;

    let breakLength = parseInt($("#break-length").html());
    if (breakLength < 60) breakLength++;
    $("#break-length").html(breakLength);
  });
  $("#break-decrement").click(() => {
    if (state === "on") return;

    let breakLength = parseInt($("#break-length").html());
    if (breakLength > 1) breakLength--;
    $("#break-length").html(breakLength);
  });

  $("#session-increment").click(() => {
    if (state === "on") return;

    let sessionLength = parseInt($("#session-length").html());
    if (sessionLength < 60) sessionLength++;
    $("#session-length").html(sessionLength);
    $("#time-left").html(`${sessionLength}:00`);
  });
  $("#session-decrement").click(() => {
    if (state === "on") return;

    let sessionLength = parseInt($("#session-length").html());
    if (sessionLength > 1) sessionLength--;
    $("#session-length").html(sessionLength);
    $("#time-left").html(
      `${sessionLength < 10 ? "0" + sessionLength : sessionLength}:00`
    );
  });

  $("#reset").click(() => {
    clearInterval(interval);
    $("#break-length").html(5);
    $("#session-length").html(25);
    $("#time-left").html("25:00");
    $("#timer-label-heading").html("Session");
     $("#beep")[0].pause();
    $("#beep")[0].currentTime=0;
    state = "off";
  });

  $("#start_stop").click(() => {
    if (state === "off") {
      state = "on";
      interval = setInterval(() => {
       if(state){
        let sesssionTime = $("#time-left").html();
        let minutes = sesssionTime.slice(0, 2);
        let seconds = sesssionTime.slice(3);

        if (minutes === "00" && seconds === "00") {
          $("#beep")[0].play();
          if ($("#timer-label-heading").html() === "Session")
            session = "inactive";
          else if ($("#timer-label-heading").html() === "Break")
            session = "active";

          if (session === "inactive") {
            $("#timer-label-heading").html("Break");
            let breakLength = parseInt($("#break-length").html());
            $("#time-left").html(
              `${breakLength < 10 ? "0" + breakLength : breakLength}:00`
            );
          } else if (session === "active") {
            $("#timer-label-heading").html("Session");
            let sessionLength = parseInt($("#session-length").html());
            $("#time-left").html(
              `${sessionLength < 10 ? "0" + sessionLength : sessionLength}:00`
            );
          }

          return;
        }

        if (seconds === "00") {
          seconds = "60";
          minutes = parseInt(minutes) - 1;
        }
        let newSessionTime = `${
          parseInt(minutes) >= 10
            ? parseInt(minutes)
            : "0" + parseInt(minutes).toString()
        }:${
          parseInt(seconds) > 10
            ? parseInt(seconds) - 1
            : "0" + (parseInt(seconds) - 1)
        }`;
        sesssionTime = newSessionTime;

        $("#time-left").html(sesssionTime);
       }
      }, 1000);
    } else if (state === "on") {
      clearInterval(interval);
      state = "off";
    }
  });
});
