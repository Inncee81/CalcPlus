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

var index = sessionStorage.getItem("index");
var script = (index == "On") "assets/CPquery.js" ? "../assets/CPquery.js";

loadScript(script, function(){
    var isDark = $("@isDark");
    var isOffline = $("*isOffline");
    var alerted = $("*alerted");

    if (!(isDark.me() == "Off" || isDark.me() == "On")) isDark.set("Off");
    if (!(isOffline.me() == "Off" || isOffline.me() == "On")) isOffline.set("Off");
    if (!(alerted.me() == "Off" || alerted.me() == "On")) alerted.set("Off");

    window.addEventListener("load", function(){
        if (isDark.me() == "On") {
            $(window).css.replaceWithAll(0, [
                'body { color: white; background-color: black; }',
                'button { color: white; background-color: rgb(50, 50, 50); border-color: rgb(60, 60, 60); }',
                'a { color: rgb(0, 0, 255); }',
                'span.broken { color: red; }',
                'span.fix { color: yellow; }',
                'span.verify { color: orange; }',
                'span.working { color: green; }',
                '.removeInput { color: black; background-color: red; border: none; }'
            ]);
        } else {
            $(window).css.replaceWithAll(0, [
                'body { color: black; background-color: white; }',
                'button { color: black; background-color: rgb(200, 200, 200); border-color: rgb(210, 210, 210); }',
                'a { color: rgb(0, 0, 192); }',
                'span.broken { color: red; }',
                'span.fix { color: rgb(235, 235, 0); }',
                'span.verify { color: orange; }',
                'span.working { color: green; }',
                '.removeInput { color: black; background-color: red; border: none; }'
            ]);
        }

        navigator.serviceWorker.getRegistration().then(function(registration) {
            if(!registration) isOffline.set("Off");
        });

        if (isOffline.me() == "Off") {
            if ('serviceWorker' in navigator) {
                var sjws = (local == "On") "sw.js"?"../sw.js";
                navigator.serviceWorker
                    .register(sjws)
                    .then(reg => {
                        console.info(`Service Worker: Registered on the scope ${reg}`);
                        isOffline.set("On");
                    })
                    .catch(err => console.error(`Service Worker failed: ${err}`));
            } else if (alerted.me() == "Off") {
                alert("Service Workers aren't supported by your browser.\nPlease switch to another browser like Chrome.\nIf you are, then please make sure your browser is updated.");
                alerted.set("On");
            }
        } else console.info("Service Workers already registered.");
        
        var c = document.querySelector(".console");
        console.log = (...args) => args.forEach(m => c.appendChild(document.createTextNode(`\n ${m}`)));
        console.info = (...args) => args.forEach(e => {
            const s = document.createElement("span");
                s.textContent = "\n" + e;
                s.style.color = "blue";
                c.appendChild(s);
        });
        console.warn = (...args) => args.forEach(e => {
            const s = document.createElement("span");
                s.textContent = "\n" + e;
                s.style.color = "rgb(205, 205, 0)";
                c.appendChild(s);
        });
        console.error = (...args) => args.forEach(e => {
            const s = document.createElement("span");
                s.textContent = "\n" + e;
                s.style.color = "red";
                c.appendChild(s);
        });
            
        window.onerror = (e, s, l, c) => console.error(`${e} at: ${s} : ${l}:${c}`);
    });
});
