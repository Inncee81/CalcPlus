function loadScript(src, f) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = src;
    var done = false;
    script.onload = script.onreadystatechange = function() { 
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            if (typeof f == 'function') f();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}

var dark;
var offline;

loadScript("assets/CPquery.js", function(){
    var isDark = $("@isDark");
    var isOffline = $("*isOffline");
    var alerted = $("@alerted");

    if (!(isDark.me() == "Off" || isDark.me() == "On")) isDark.set("Off");
    if (!(isOffline.me() == "Off" || isOffline.me() == "On")) isOffline.set("Off");
    if (!(alerted.me() == "Off" || alerted.me() == "On")) alerted.set("Off");

    isDark = $("@isDark");
    isOffline = $("*isOffline");
    alerted = $("@alerted");

    dark = function(wndw) {
        if (isDark.me() == "On") {
            $(wndw).css.replace(0, 'body { color: white; background-color: black; }');
            $(wndw).css.append(0, 'a { color: rgb(0, 0, 255); }');
        } else {
            $(wndw).css.replace(0, 'body { color: black; background-color: white; }');
            $(wndw).css.append(0, 'a { color: rbg(0, 0, 192); }');
        }
        
        $(wndw).css.append(0, 'span.broken { color: red; }');
        $(wndw).css.append(0, 'span.fix { color: rbg(205, 205, 0); }');
        $(wndw).css.append(0, 'span.verify { color: orange; }');
        $(wndw).css.append(0, 'span.working { color: green; }');
        $(wndw).css.append(0, '.removeInput { color: black; background-color: red; border: none; }');
    }

    offline = function(wndw) {
        isOffline = $("*isOffline");
        alerted = $("@alerted");
        //navigator.serviceWorker.getRegistration().then(function(registration) {
        //    if(!registration) isOffline.set("false");
        //});
        if (isOffline.me() == "Off") {
            if ('serviceWorker' in navigator) {
                wndw.addEventListener('load', () => {
                    navigator.serviceWorker
                        .register("../sw.js")
                        .then(reg => console.info(`Service Worker: Registered on the scope ${reg}`))
                        .catch(err => console.error(`Service Worker failed: ${err}`));
                });
            } else if (alerted.me() == "false") {
                wndw.alert("Service Workers aren't supported by your browser.\nPlease switch to another browser like Chrome.\nIf you are, then please make sure your browser is updated.");
                alerted.set("true");
            }
        } else {
            console.log("Not re-registering Service Workers as it's already been done.");
        }
    }
});

function load(wndw) {
    wndw.onload = function() {
        dark(wndw);
        offline(wndw);
    };
}
