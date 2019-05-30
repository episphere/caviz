console.log('caviz.js loaded');

(function(){ // caviz in the scope of an anonymous function so it wont contaminate root if required
    let caviz={
        created_at:Date()
    }

    caviz.seerStatus = async function(k){ // k is api key
        k = k||(function(){
            if(typeof(localStorage)=="object"){ // update from localStorage if available
                if(localStorage.seerKey){
                    caviz.seerKey=localStorage.seerKey
                }
            }
            return caviz.seerKey
        })()
        //return (await fetch('https://api.seer.cancer.gov/rest/staging/cs/02.05.50/schemas?api_key='+k)).json()
        return (await fetch('https://api.seer.cancer.gov/rest/staging/cs/02.05.50/schemas',{
            headers:{
                'X-SEERAPI-Key':k
            }
        })).json()
    }


    if(typeof(define)!='undefined'){
        define(caviz)
    }
    if(typeof(window)!='undefined'){
        window.caviz=caviz
    }
})()