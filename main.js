const menuBtn = document.getElementById('menuBtn')
const sideBar = document.getElementById('sideBar')
const closeBtn = document.getElementById('closeBtn')

const themeMode = document.querySelector('.theme-wrapper')
const themeIcon = document.querySelector('.theme-wrapper span')
const themeText = document.querySelector('.theme-wrapper p')

const header = document.querySelector('header')
const main = document.querySelector('main')
const body = document.querySelector('body')
const initialmessage = document.querySelector('.initialmessage')



// -----------------Side bar toggler-------------------

menuBtn.addEventListener('click', ()=>{

    isActive = sideBar.classList.contains('active')

    if(!isActive){
        sideBar.classList.add('active')
    }

})
closeBtn.addEventListener('click', ()=>{

    isActive = sideBar.classList.contains('active')

    if(isActive){
        sideBar.classList.remove('active')
    }

})



// -----------------Day and Night mode changer-------------------
themeMode.addEventListener('click', () => {
    const isLight = themeIcon.textContent === 'light_mode' && themeText.textContent === 'Light mode';

    isLight ? lightMode() : darkMode();
});

const lightMode = ()=>{
    themeIcon.textContent = 'dark_mode'
    themeText.textContent = 'Dark mode'

    header.classList.add('light')
    main.classList.add('light')
    body.classList.add('light')
}
const darkMode = ()=>{
    themeIcon.textContent = 'light_mode'
    themeText.textContent = 'Light mode'

    header.classList.remove('light')
    main.classList.remove('light')
    body.classList.remove('light')
}




// ------------Fecthing the openAi api--------------

const API_URL = "https://api.openai.com/v1/chat/completions"
const API_KEY = "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"



const senBtn = document.getElementById('senBtn')
const chatWrapper = document.querySelector(".chat-wrapper")
const emptyMessage = document.querySelector(".emptyMessage")


senBtn.addEventListener('click', () => {
  
    const userMessage = document.getElementById('userMessage').value;
    
    if (userMessage.length > 0) {
        initialmessage.style.display = 'none';
        let userdisplay = `
            <div class="request-box">
                <img src="images/user-image.png" alt="">
                <span>${userMessage}</span>
            </div>`;
        chatWrapper.insertAdjacentHTML('beforeend', userdisplay);

        userMessage.value = '';


        let loadingResponse = `
            <div class="response-box loading">
                <img src="images/gpt-logo.png" alt="">
                <div class="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>`;
        chatWrapper.insertAdjacentHTML('beforeend', loadingResponse);

        const Gptresponse = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": userMessage}]
            })
        };

        setTimeout(() => {
            fetch(API_URL, Gptresponse)
                .then(response => response.json())
                .then(data => {

                    document.querySelector('.response-box.loading').remove();
                     
                    let  responseContent =  data.choices[0].message.content
                    console.log(responseContent)

                    let gptResponse = `
                        <div class="response-box">
                            <img src="images/gpt-logo.png" alt="">
                            <span>${responseContent}</span>
                        </div>`;
                    chatWrapper.insertAdjacentHTML('beforeend', gptResponse);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    } else {
        initialmessage.style.display = 'block';
    }
});


const newchatWrapper = document.querySelector('.newchat-wrapper')


newchatWrapper.addEventListener('click', () => {
    chatWrapper.innerHTML = '';
    document.getElementById('userMessage').value = ''; 


    let emptyMessage = document.createElement('div');
    emptyMessage.classList.add('emptyMessage');
    emptyMessage.innerHTML = `
        <p>Sometimes, GPT may offer inaccurate responses due to limitations in understanding context or misinformation in its training data. Users should critically evaluate its outputs and not solely rely on them for crucial decisions. Always cross-reference information from reliable sources to mitigate the risk of receiving incorrect or misleading messages.</p>
    `;


    chatWrapper.appendChild(emptyMessage);
});


