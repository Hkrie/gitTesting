/*
cwiki.apache.org/confluence/display/WICKET/Dealing+with+cookies
darkMode add/get/change logic
darkMode cookie stored and changed when pressed on button
click changes the current into the opposite light->dark, dark->light
*/
//to create cookie
WebResponse weResponse = (WebResponse)RequestCycle.get().getResponse();
//to get Cookie
WebRequest webRequest = (WebRequest)RequestCycle.get().getRequest();
//check if cookie already exists

if(!webRequest.getCookie("darkMode")){
Cookie cookie = new Cookie("darkMode", true);
// updateBodyClass('add')
webResponse.addCookie(cookie);
}else{
Cookie cookieDarkMode = webRequest.getCookie("darkMode");
if(cookieDarkMode === true){
cookieDarkMode = false;
updateBodyClass('remove')
}else{
cookieDarkMode = true;
updateBodyClass('add')
}
}

updateBodyClass(changeClass){
if(changeClass === 'add'){
document.body.classList.add('darkMode');
    }else{
    document.body.classList.remove('darkMode');
    }
}

/*
button/input -> wicket-id="SwitchMode"
respective java class

*/




session 
session container
	properties e.g. theme value



