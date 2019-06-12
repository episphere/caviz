console.log('caviz.js loaded');

(function(){ // caviz in the scope of an anonymous function so it wont contaminate root if required
    let caviz={
        created_at:Date()
    }

    caviz.seerData={}

    caviz.seerStart = async function(k){ // k is api key
        let that=this
        k = k||(function(){
            if(typeof(localStorage)=="object"){ // update from localStorage if available
                if(localStorage.seerKey){
                    that.seerKey=localStorage.seerKey
                }else{
                    error('SEER API key not provided and also not found in local storage')
                }
            }else{
                error('SEER API key not provided and local storage not found')
            }
            return that.seerKey
        })()
        //return (await fetch('https://api.seer.cancer.gov/rest/staging/cs/02.05.50/schemas?api_key='+k)).json()
        localStorage.seerKey=k
        caviz.seerKey=k
        return (await fetch(`${this.seerUrl}/staging/cs/02.05.50/schemas`,{
            headers:{
                'X-SEERAPI-Key':k
            }
        })).json()
    }

    caviz.seerLogin=async function(k){
        let dd = await caviz.seerStart(k)
        caviz.seerData.schemas=dd
        return dd
    }

    caviz.seerUrl='https://api.seer.cancer.gov/rest'
    caviz.seerVersion='latest'

    caviz.seerGet=async function(url){
        if(!this.seerKey){
            console.log('seerKey not found, logging in first ...')
            await this.seerLogin()
            console.log("... found key, we're in!")
        }
        url=url||`${this.seerUrl}/staging/cs/02.05.50/schemas`
        return (await fetch(url,{
            headers:{
                'X-SEERAPI-Key':caviz.seerKey
            }
        })).json()
    }

    caviz.seerDisease=async function(parms){
        parms=parms||'' //'count=25&glossary=false&mode=OR&offset=0&order=name&output_type=MIN'
        return await caviz.seerGet(`${this.seerUrl}/disease/${this.seerVersion}?${parms}`)
    }

    caviz.seerDiseaseAll=async function(){
        if(this.seerData.diseases){ // trying cache first
            var dd = this.seerData.diseases
        }else{
            var dd = await this.seerDisease('count=1')
            for(let i = 1 ; i<dd.total ; i=i+100){
                let di = await this.seerDisease(`count=100&offset=${i}`)
                dd.results=dd.results.concat(di.results)
                console.log(`${dd.results.length}/${dd.total}`)
            }
            this.seerData.diseases=dd // caching
        }        
        return dd
    }

    if(typeof(define)!='undefined'){
        define(caviz)
    } else if(typeof(window)!='undefined'){
        window.caviz=caviz
    }
})()