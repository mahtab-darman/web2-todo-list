let setting = document.querySelector('.setting');
let check = document.querySelector('#checkbox');
let filterTheme = document.querySelector('.theme');

setting.addEventListener('click',()=>{
    if(check.checked == true){
        console.log(check.checked);
        filterTheme.style.display = "flex";
    }else{
        filterTheme.style.display = "none";
    }
});



filterTheme.addEventListener('click', (e) =>{
        switch(e.target.value){
            case "theme1":
                window.document.styleSheets[0].ownerNode.innerHTML = `<link rel="stylesheet" href="style1.css" />`;
                break;
            case "theme2":
                window.document.styleSheets[0].ownerNode.innerHTML = `<link rel="stylesheet" href="style2.css" />`;
                break;
            case "theme3":
                window.document.styleSheets[0].ownerNode.innerHTML = `<link rel="stylesheet" href="style3.css" />`;
                break;

        };
});