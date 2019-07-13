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

var index = sessionStorage.getItem("index") == "On";
var script = index ? "assets/CPquery.js":"../assets/CPquery.js";

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
                '.removeInput { color: black; background-color: red; border: none; }',
                'nav a { background-color: rgb(30, 30, 30); color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px rgb(75, 75, 75); border-top-left-radius: 5px; border-top-right-radius: 5px; width: 16.66%; text-align: center; box-sizing: border-box; }',
                'nav a:link, nav a:visited { background-color: rgb(30, 30, 30); color: white; }',
                'nav a:hover, nav a:active { background-color: rgb(60, 60, 60); color: rgb(215, 215, 215); }'
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
                '.removeInput { color: black; background-color: red; border: none; }',
                'nav a { background-color: grey; color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px silver; border-top-left-radius: 5px; border-top-right-radius: 5px; width: 16.66%; text-align: center; box-sizing: border-box; }',
                'nav a:link, nav a:visited { background-color: grey; color: white; }',
                'nav a:hover, nav a:active { background-color: silver; color: black; }'
            ]);
        }

        navigator.serviceWorker.getRegistration().then(function(registration) {
            if(!registration) isOffline.set("Off");
        });

        if (isOffline.me() == "Off") {
            if ('serviceWorker' in navigator) {
                var sjws = index ? "sw.js":"../sw.js";
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
        console.log = (...args) => args.forEach(m => {
            try {
                c.appendChild(document.createTextNode(`\n ${m}`));
            } catch(err) {
                console.log(m);
            }
        });
        console.warn = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "rgb(205, 205, 0)";
                    c.appendChild(s);
            } catch(err) {
                console.warn(e);
            }
        });
        console.error = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "red";
                    c.appendChild(s);
            } catch(err) {
                console.error(e);
            }
        });
            
        window.onerror = (e, s, l, c) => console.error(`${e} at: ${s} : ${l}:${c}`);
    });
});
