window.onload = function() {

    const slider = document.getElementById('slider');
    const imgContainer = document.getElementById('img_container');
    const img = document.getElementById('img_frame')

    let idx = slider.value;
    let sliderWidth = img.clientWidth;
    let moveAmount = idx * sliderWidth;

    function sliderChange () {
        idx = slider.value;
        moveAmount = idx * sliderWidth;
        console.log(moveAmount);
    }    

    slider.onchange = (e) => sliderChange();

    window.addEventListener('resize', (e) => {
        sliderWidth = img.clientWidth;
        moveAmount = idx * sliderWidth;
        imgContainer.style.transform = `translateX(-${moveAmount}px)`;
    })

    slider.addEventListener('click', (e) => {
        e.preventDefault();
        imgContainer.style.transform = `translateX(-${moveAmount}px)`;
    });
}