console.log('caviz.js loaded');

(function(){
    let caviz={
        created_at:Date()
    }

    caviz.getSeerKey=id=>{ // get/provide SEER key from input elelment with given id
        id=id||'seerKeyInput'
        let ip = document.getElementById(id)
        
    }



    if(typeof(define)!='undefined'){
        define(caviz)
    }
    if(typeof(window)!='undefined'){
        window.caviz=caviz
    }
})()