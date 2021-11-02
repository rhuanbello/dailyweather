import {Dom} from "./modules-dom.js"


const loadingScreen = () => {
    const progressBar = new Dom('progress')
    const loadingPage = new Dom('.main-loading')
    const mainHome = new Dom('.main-home')
    let progressBarValue = 0;   

    const animationBar = (speed, add) => {

        if (add) {
            progressBarValue++;
        } else {
            progressBarValue = 0;
        }
        
        progressBar.element().setAttribute('value', progressBarValue);
        setTimeout(() => fillBar(), speed)

    }

    const fillBar = () => {
        if (progressBarValue < 101){
            // mainHome.addClass('hidden')
            animationBar(40, true)
        } else {
            loadingPage.addClass('hidden')
            mainHome.removeClass('hidden')


        }

    }

    fillBar()
}

loadingScreen()

