let filter = false
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const dogBar = document.querySelector('div#dog-bar')
    const dogInfo = document.querySelector('div#dog-info')
    const filterBtn = document.querySelector('button#good-dog-filter')

    fetchPups(filter)

    filterBtn.addEventListener('click', () => {
        filter = !filter
        filter? filterBtn.innerText = "Filter good dogs: ON" : filterBtn.innerText = "Filter good dogs: OFF"
        fetchPups(filter)
    })


    function fetchPups(){
        dogBar.innerHTML = ""
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        // .then(console.log)
        .then(pups => pups.forEach(pup => {
            if(!filter || filter && pup.isGoodDog){
                appendPup(pup)
            }
        }))
    }

    function appendPup(pup){
        // console.log(pup.name)
        const span = ce('span')
        span.innerText = pup.name

        span.addEventListener('click', () => {
            // console.log('SPAN IS BEING PRESSED')
            dogInfo.innerHTML = ""
            const img = ce('img')
            img.src = pup.image

            const h2 = ce('h2')
            h2.innerText = pup.name

            const btn = ce('btn')
            if(pup.isGoodDog){
                btn.innerText = 'Good Dog'
            }else{
                btn.innerText = 'Bad Dog'
            }

            btn.addEventListener('click', () => {
                if(pup.isGoodDog){
                    btn.innerText = 'Bad Dog'
                }else{
                    btn.innerText = 'Good Dog'
                }
                flipGoodDog(pup)  
                pup.isGoodDog = !pup.isGoodDog
                
            })
            dogInfo.append(img, h2, btn)

        })

        dogBar.append(span)
    }

    function flipGoodDog(pup){
        configObj = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                "isGoodDog": !(pup.isGoodDog)
            })
        }
        // debugger

        fetch(`http://localhost:3000/pups/${pup.id}`, configObj)
       
    }
    function ce(ele){
        return document.createElement(ele)
    }
})