document.addEventListener("DOMContentLoaded", function(event) {

    //change mode
    for(let j=0;j<document.getElementsByClassName('bg-mode-icon').length;j++){
    document.getElementsByClassName('bg-mode-icon')[j].addEventListener('click', (event)=> {
        let _this = event.currentTarget;
        for (let i = 0; i < document.getElementsByClassName('bg-mode-icon').length; i++) {
            let target = document.getElementsByClassName('bg-mode-icon')[i];
            if (target !== _this) {
                target.classList.add('active');
                _this.classList.remove('active');
                break;
            }
        }
    });}

    //detect onclick for change mode
    document.getElementById('light_mode').addEventListener('click', ()=>{
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    });
    document.getElementById('dark_mode').addEventListener('click', ()=>{
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    });

    //detect dark_mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById("dark_mode").click();
        document.getElementById("light_mode").classList.add("active");
    }else{
        document.getElementById("light_mode").click();
        document.getElementById("dark_mode").classList.add("active");
    }
});
