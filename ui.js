$(document).ready(function() {
  // selecting chart variable
  $(".dropdown-menu li").click(function(e) {
    var crime = $(e.target).text();
    $(".dropdown button span.text").text(crime);
    plotData();
  });

  // selecting chart ranges
  $(".setting-pill").click(function(e) {
    var pill = $(e.target);
    if (!pill.hasClass("setting-pill")) {
      return;
    }
    $(".setting-pill").removeClass("selected");
    pill.addClass("selected");
    plotData();
  });

  $(".btn-toolbar button.btn").click(function(e) {
    $(".btn-toolbar button.btn").removeClass("selected");
    $(e.target).addClass("selected");
    plotData();
  });

  // custom min/max chart range
  $("#ymin, #ymax").change(function(e) {
    var mymin = $("#ymin").val() * 1,
        mymax = $("#ymax").val() * 1;
    if (mymax < 0) {
      $("#ymax").val(1);
      mymax = 1;
    }
    if (mymin < 0) {
      $("#ymin").val(0);
    }
    if (mymin > 99) {
      $("#ymin").val(99);
    }
    if (mymin > mymax) {
      $("#ymin").val(mymax - 1);
    }
    if (mymax > 100) {
      $("#ymax").val(100);
    }
    plotData();
  });

  $("#xmin, #xmax").change(function(e) {
    var mymin = $("#xmin").val() * 1,
        mymax = $("#xmax").val() * 1;
    if (mymax < 0) {
      $("#xmax").val(1);
      mymax = 1;
    }
    if (mymin < 0) {
      $("#xmin").val(0);
    }
    if (mymin > mymax) {
      $("#xmin").val(mymax - 1);
    }
    plotData();
  });
});
