/* Some javascript learnings. Run in a browser */


// This IIFE demonstrates when calling await it only 'blocks' the current executing scope waiting
// until the promise resolves but continues any parent scope thread execution.
// If it is the main thread executing then it will pause as expected.
(async () => {
    async function someAsyncFn() {
        console.log(await new Promise(resolve => setTimeout(() => resolve('after 2 secs from first await'), 2000)));
    }
    someAsyncFn();
    console.log('after calling someAsyncFn function');
    console.log(await new Promise(resolve => setTimeout(() => resolve('after 1 sec from second await'), 1000)));
    console.log('after second await');
})();

// This function showcases 3 ways to wait for multiple asynchronous ajax calls
async function go() {
    let styles = ['buzzcut', 'caesar'];
    let promises = [];

    // 1. With Fetch API. Notice //.json() returns another promise so need 2 callback .then
    // Using ES6 Promises
    Promise.all(styles.map(style => fetch('/' + style + '/info.json')))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => printData(data))
        .catch(err => console.error(err));
    // Using ES8 async/await
    promises = await Promise.all(styles.map(style => fetch('/' + style + '/info.json')));
    printData(await Promise.all(promises.map(res => res.json())));


    // 2. With XMLHttpRequest
    function getPromiseFromAjaxGet(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    };
    promises = [];
    styles.forEach(style =>
        promises.push(getPromiseFromAjaxGet(('/' + style +'/info.json'))));
    // Using ES6 Promises
    Promise.all(promises).then(jsonArr => printData(jsonArr));
    // Using ES8 async/await
    printData(await Promise.all(promises));


    // 3. With JQuery.
    function getPromiseFromJQueryGetJSON(url) {
        return new Promise(function(resolve, reject) {
            $.getJSON(url)
                .done(json => resolve(json))
                .fail((jqxhr, textStatus, error) => reject(error));
        });
    };
    promises = [];
    styles.forEach(style =>
        promises.push(getPromiseFromJQueryGetJSON(('/' + style +'/info.json'))));
    // Using ES6 Promises
    Promise.all(promises).then(jsonArr => printData(jsonArr));
    // Using ES8 async/await
    printData(await Promise.all(promises));

    function printData(data) {
        data.forEach(d => {
            if (typeof d == 'string')
                console.log(JSON.parse(d));
            else
                console.log(d);
        });
    }
}

go();

// Function to lazy load a script
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}