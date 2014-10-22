function countdownFor(event) {
    var now,then,seconds, params;

    seconds = parseInt($("#days").val(),10) * (24 * 60 * 60)
              + parseInt($("#hours").val(),10) * (60 * 60)
              + parseInt($("#minutes").val(),10) * 60
              + parseInt($("#seconds").val(),10);

    now = new Date()
    then = new Date(now.getTime() + (seconds * 1000))

    params = "dt=" + then.toISOString() + "&t=" + $("#t").val();
    window.location = window.location + "?" + params;

    return false;
}

function countdownTo(event) {
    var then;

    then = new Date(Date.parse($("#dt").val()))

    params = "dt=" + then.toISOString() + "&t=" + $("#t").val();
    window.location = window.location + "?" + params;

    return false
}

function queryParameters () {
    var result = {};

    var params = window.location.search.split(/\?|\&/);

    result["dt"] = "";

    params.forEach( function(it) {
        if (it) {
            var param = it.split("=");
            result[param[0]] = param[1];
        }
    });

    return result;
}

$(document).ready(function() {
    var params = queryParameters();
    var size, maxwidth, clock, now, dt, diffsecs;
    var face, width;
    var title;

    if (params["dt"] === "") {
        $("#forms").css("display","block");
        $("#timers").css("display","none");
        $("#new").css("display","none");

        $("#for").submit(countdownFor)
        $("#to").submit(countdownTo)
    } else {
        $("#forms").css("display","none");
        $("#timers").css("display","block");
        $("#new").css("display","block");

        title = decodeURI(params["t"]);

        $("#title").html(title);

        now = new Date().getTime()
        dt = new Date(Date.parse(params["dt"])).getTime();
        diffsecs = (dt / 1000) - (now / 1000);

        if (diffsecs > 0) {
            // The FlipClock.js face is px based, so there's no scaling...
            face = "HourlyCounter";
            width = 460;
            if (diffsecs > (24 * 60 * 60)) {
                face = "DailyCounter";
                width = 620;
            }
            $("#viewport").attr("content", "width=" + (width+40));

            $("#clock").css("width", width);

            clock = $("#clock").FlipClock(diffsecs, {
                "clockFace": face,
                "countdown": true
            });
        } else {
            $("#clock").html("...has already occurred");
            $("#clock").css("text-align", "center");
            $("#clock").css("font-family",
                            "\"Helvetica Neue\", Helvetica, sans-serif");
            $("#clock").css("font-size", "48px");
        }
    }
});

