console.log('caviz.js loaded');

(function(){
    let caviz={
        created_at:Date()
    }
    if(typeof(define)!='undefined'){
        define(caviz)
    }
    if(typeof(window)!='undefined'){
        window.caviz=caviz
    }
})()