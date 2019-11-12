import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "./style.scss";

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
    let isStateOff= $('#start_stop').hasClass('fa-pause-circle');
    if(isStateOff===true){
      $("#start_stop").removeClass("fa-pause-circle");
      $("#start_stop").addClass("fa-play-circle");
      $("#top-element-1").removeClass("button-press-anim");
    }
    let isResetAlreadyDone= $('#top-element-2').hasClass('button-press-anim');
    console.log(isResetAlreadyDone);
    if(isResetAlreadyDone===true){
     document.getElementById("top-element-2").classList.remove("button-press-anim");
     // the re adding of class has to be done after a moment
     setTimeout(()=>{
        document.getElementById("top-element-2").classList.add("button-press-anim");
     },1);
    }
    else{
      $("#top-element-2").addClass("button-press-anim");
    }
    $("#break-length").html(5);
    $("#session-length").html(25);
    $("#time-left").html("25:00");
    $("#timer-label-heading").html("Session");
    $("#beep")[0].pause();
    $("#beep")[0].currentTime = 0;
    state = "off";
  });

  $("#start_stop").click(() => {
    if (state === "off") {
      $("#start_stop").removeClass("fa-play-circle");
      $("#start_stop").addClass("fa-pause-circle");
      state = "on";
      $("#top-element-1").addClass("button-press-anim");
      interval = setInterval(() => {
        if (state) {
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
    } 
    else if (state === "on") {
      $("#start_stop").removeClass("fa-pause-circle");
      $("#start_stop").addClass("fa-play-circle");
      $("#top-element-1").removeClass("button-press-anim");
      clearInterval(interval);
      state = "off";
    }
  });
});