this.document.querySelector('body').style.opacity = '0'

window.addEventListener('load', function() {
    this.document.querySelector('body').style.opacity = '1';
});


//-------------------------------------
//------------------------------------- opções da barra de navegação ------------------------------- //

const  selectSimulator = document.querySelector('header nav ul .nav-simuladores .nav-principal');
const  iconSelectSimulator = document.querySelector('header nav ul .nav-simuladores .nav-principal .material-symbols-outlined');
const  optionsSimulator = document.querySelector('header nav ul .nav-simuladores .options');

const selectCalculator = document.querySelector('header nav ul .nav-calculadora .nav-principal');
const  iconSelectCalculator = document.querySelector('header nav ul .nav-calculadora .nav-principal .material-symbols-outlined');
const  optionsCalculator = document.querySelector('header nav ul .nav-calculadora .options');


//--- simuladores
selectSimulator.addEventListener('mouseenter', function() {
    optionsSimulator.style.display = 'flex';
    iconSelectSimulator.style.rotate = '-180deg'
    iconSelectSimulator.style.transition = 'all 0.2s ease'
});

selectSimulator.addEventListener('mouseleave', function(e) {
    if (!selectSimulator.contains(e.relatedTarget) && !optionsSimulator.contains(e.relatedTarget)) {
        optionsSimulator.style.display = 'none';
        iconSelectSimulator.style.rotate = ''
    }
});

optionsSimulator.addEventListener('mouseleave', function(e) {
    if (!selectSimulator.contains(e.relatedTarget) && !optionsSimulator.contains(e.relatedTarget)) {
        optionsSimulator.style.display = 'none';
        iconSelectSimulator.style.rotate = ''
    }
});

//--- Calculadores
selectCalculator.addEventListener('mouseenter', function() {
    optionsCalculator.style.display = 'flex';
    iconSelectCalculator.style.rotate = '-180deg'
    iconSelectCalculator.style.transition = 'all 0.2s ease'
});

selectCalculator.addEventListener('mouseleave', function(e) {
    if (!selectCalculator.contains(e.relatedTarget) && !optionsCalculator.contains(e.relatedTarget)) {
        optionsCalculator.style.display = 'none';
        iconSelectCalculator.style.rotate = '';
    }
});

optionsCalculator.addEventListener('mouseleave', function(e) {
    if (!selectCalculator.contains(e.relatedTarget) && !optionsCalculator.contains(e.relatedTarget)) {
        optionsCalculator.style.display = 'none';
        iconSelectCalculator.style.rotate = '';
    }
});

//-------------------------------------

