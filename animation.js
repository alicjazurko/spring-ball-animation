const ball = document.querySelector('.ball'), 
btn = document.querySelector('.btn-action'), 
spring = document.querySelector('.spring'), 
fill = document.querySelector('.fill');

const stretchSpring = () => {
    fill.style.animationName = "bar";
    fill.style.animationPlayState = "running";
    spring.style.animationPlayState = "running";
    btn.textContent = "puść sprężynę";
    
    btn.removeEventListener('mousedown', stretchSpring);
    btn.removeEventListener('touchstart', stretchSpring);
}

const releaseSpring = () => {
    const fillStyles = getComputedStyle(fill); //pobieramy style css elementu 
    const fillWidth = parseInt(fillStyles.width, 10); //10 - system dziesiętny
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);

    const progressPercent = (fillWidth / barWidth).toFixed(2);

    btn.textContent = `Moc uderzenia: ${(progressPercent * 100).toFixed()}%`
    fill.style.animationPlayState = 'paused';

    document.documentElement.style.setProperty("--power-x", `${20 + progressPercent * 100}%`)
    ball.style.animation = 'fly-ball-x 1.3s 1 forwards cubic-bezier(.1,.38,.35,.89), fly-ball-y 1.3s 1 forwards linear';

    document.documentElement.style.setProperty('--spring-left', getComputedStyle(spring).left);
    spring.style.animation = 'release-spring 0.2s 1 forwards linear';

    btn.removeEventListener('mouseup', stretchSpring);
    btn.removeEventListener('touchend', stretchSpring);

    ball.addEventListener('animationend', resetAnimatin);



}

const resetAnimatin = () => {
    console.log('reset ');
    ball.removeEventListener('animationend', resetAnimatin);

    setTimeout(() => {
        btn.addEventListener('mousedown', stretchSpring);
        btn.addEventListener('mouseup', releaseSpring);

        btn.addEventListener('touchstart', stretchSpring);
        btn.addEventListener('touchend', releaseSpring);
        btn.textContent = 'Naciągnij sprężynę';

        spring.style.animation = "";
        ball.style.animation = "";
        fill.style.animationName = "none";

    }, 1000)




    

}

btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);

btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);
