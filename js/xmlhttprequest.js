document.addEventListener("DOMContentLoaded", () => {
    createButton("get-btn", "GET Data", getData);
    createButton("send-btn", "POST Data", sendData);
    createButton("tryOfficalApi", "Mensen Dresden", getDataMensen("https://openmensa.org/api/v2/canteens"))

});
const createButton = (id, innerText, callFunction) => {
    const buttonGet = document.createElement('button');
    buttonGet.id = id;
    buttonGet.classList.add("btn");
    buttonGet.classList.add("btn-primary");
    buttonGet.classList.add("m-2");
    buttonGet.innerText = innerText;
    buttonGet.addEventListener("click", callFunction, false);
    document.getElementById("xmlHttpRequest").appendChild(buttonGet);
};

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => { //reject produces error
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = "json";

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {                           //triggers only on technical errors (fails to be send, because no internet connection, ...)
            reject("Technical error! Have you checked your internet connection?");
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;

};

const getData = () => {
    sendHttpRequest("GET", "https://reqres.in/api/users").then(responseData => {
        console.log(responseData);
    });
};

const sendData = () => {
    sendHttpRequest("POST", "https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol"
    })
        .then(responseData => {
            console.log(responseData);
        })
        .catch(err => {                                       //triggers if you get no response
            console.log(err);
        });
};

const getDataMensen = (url) => {
    sendHttpRequest("GET", url).then(responseData => {
        // console.log(responseData);
        for (let i in responseData) {
            if(responseData[i]["city"] === "Berlin"){
                console.log(responseData[i]);
            }
        }
    });
};