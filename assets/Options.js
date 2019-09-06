function loadOptions(){
    function isUndefined(setting) {
        return !(setting.me() == "Off" || setting.me() == "On");
    }
    if (isUndefined(isDark)) isDark.set("Off");
    if (isUndefined(isOffline)) isOffline.set("Off");
    if (isUndefined(alerted)) alerted.set("Off");
    if (isUndefined(Console)) Console.set("Off");
    if (isUndefined(savei)) savei.set("Off");
    if (isUndefined(beta)) beta.set("Off");

    window.addEventListener("load", function(){
        if (isDark.me() == "On") {
            $(window).css.replaceWithAll(0, [
                'body { color: white; background-color: black; margin: 0; }',
                'button { color: white; background-color: rgb(50, 50, 50); border-color: rgb(60, 60, 60); }',
                'a { color: rgb(0, 0, 255); }',
                'span.broken { color: red; }',
                'span.fix { color: yellow; }',
                'span.verify { color: orange; }',
                'span.working { color: green; }',
                '.removeInput { color: black; background-color: red; border: none; }',
                'nav a { background-color: rgb(30, 30, 30); color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px rgb(75, 75, 75); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; width: 16.666%; text-align: center; box-sizing: border-box; }',
                'nav a:link, nav a:visited { background-color: rgb(30, 30, 30); color: white; }',
                'nav a:hover, nav a:active { background-color: rgb(60, 60, 60); color: rgb(215, 215, 215); }'
            ]);
        } else {
            $(window).css.replaceWithAll(0, [
                'body { color: black; background-color: white; margin: 0; }',
                'button { color: black; background-color: rgb(200, 200, 200); border-color: rgb(210, 210, 210); }',
                'a { color: rgb(0, 0, 192); }',
                'span.broken { color: red; }',
                'span.fix { color: rgb(235, 235, 0); }',
                'span.verify { color: orange; }',
                'span.working { color: green; }',
                '.removeInput { color: black; background-color: red; border: none; }',
                'nav a { background-color: grey; color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px silver; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; width: 16.666%; text-align: center; box-sizing: border-box; }',
                'nav a:link, nav a:visited { background-color: grey; color: white; }',
                'nav a:hover, nav a:active { background-color: silver; color: black; }'
            ]);
        }

        navigator.serviceWorker.getRegistration().then(function(registration) {
            if(!registration) isOffline.set("Off");
        });

        if (isOffline.me() == "Off") {
            if ('serviceWorker' in navigator) {
                var sjws;
                if (beta.me() == "On") sjws = index ? "sw.js":"../sw.js";
                else sjws = index ? "sw.min.js":"../sw.min.js";
                navigator.serviceWorker
                    .register(sjws)
                    .then(reg => {
                        console.info(`Service Worker: Registered on the scope ${reg}`);
                        isOffline.set("On");
                    })
                    .catch(err => console.error(`Service Worker failed: ${err}`));
            } else if (alerted.me() == "Off") {
                alert("Service Workers aren't supported by your browser.\nSwitch to another browser like Chrome, or update your browser.");
                alerted.set("On");
            }
        } else console.info("Service Workers already registered.");
    });
    if (console.me() == "On") {
        var c = document.querySelector(".console");
        console.log = (...args) => args.forEach(m => {
            try {
                c.appendChild(document.createTextNode(`\n ${m}`));
            } catch(e) {
                console.log(e);
            }
        });
        console.warn = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "rgb(205, 205, 0)";
                    c.appendChild(s);
            } catch(e) {
                console.warn(e);
            }
        });
        console.error = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "red";
                    c.appendChild(s);
            } catch(e) {
                console.error(e);
            }
        });

        window.onerror=(e,s,l,c)=>console.error(`${e} at: ${s} : ${l}:${c}`);
    }
};
function optionsInit(document) {
    var url,script = document.createElement('script');
    if (localStorage.getItem("beta") == "On") url = (sessionStorage.getItem("index") == "On") ? "assets/CPquery.js":"../assets/CPquery.js";
    else url = (sessionStorage.getItem("index") == "On") ? "assets/CPquery_1-0-0.min.js":"../assets/CPquery_1-0-0.min.js";
    script.setAttribute('src',url);
    var isDark = $("@isDark"), isOffline = $("*isOffline"), alerted = $("*alerted"), Console = $("@isConsole"), savei = $("@isSaveI"), beta = $("@isBeta");
    script.onload = script.onreadystatechange = loadOptions();
    document.head.appendChild(script);
}
