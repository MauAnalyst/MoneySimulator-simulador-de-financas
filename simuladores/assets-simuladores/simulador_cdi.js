//--------------------------
//-------------------------- selecionando o perdiodo

const SelectIntervalo = document.querySelector('main .formulario-section .form-itens .form-item .input-intervalo .select-intervalo .screem-intervalo');
const SelectIntervaloP = document.querySelector('main .formulario-section .form-itens .form-item .input-intervalo .select-intervalo .screem-intervalo p');
const SelectIntervaloIcon = document.querySelector('main .formulario-section .form-itens .form-item .input-intervalo .select-intervalo .screem-intervalo .material-symbols-outlined');
const optionsIntervalo = document.querySelector('main .formulario-section .form-itens .form-item .input-intervalo .select-intervalo .options-intervalo');
const optionIntervalo = document.querySelectorAll('main .formulario-section .form-itens .form-item .input-intervalo .select-intervalo .options-intervalo li');

SelectIntervalo.addEventListener('click', function(){
    SelectIntervalo.style.backgroundColor = '#3D71E6';
    optionsIntervalo.style.display = 'block';
    SelectIntervaloIcon.style.rotate = '-180deg';
    SelectIntervaloIcon.style.transition = 'all 0.2s ease';
});
optionIntervalo.forEach(e => {
    e.addEventListener('click', function(){
        SelectIntervalo.style.backgroundColor = '';
        SelectIntervaloP.textContent =  e.textContent;
        optionsIntervalo.style.display = 'none';
        SelectIntervaloIcon.style.rotate = '';
    })
});

document.addEventListener('click', function(e){
    if(!SelectIntervalo.contains(e.target) && !optionsIntervalo.contains(e.target)){
        SelectIntervalo.style.backgroundColor = '';
        optionsIntervalo.style.display = 'none';
        SelectIntervaloIcon.style.rotate = '';
    }
});


//--------------------------
// ------------------------- dados do cdi no intro-section


//---- definindo as datas
const data = new Date();
const mesAtual = data.getMonth() + 1;
const anoAtual = data.getFullYear();
const MesAnoAtual = `${mesAtual < 10 ? "0"+mesAtual : mesAtual}/${anoAtual}`


const mesTaxa = document.querySelector('.intro-section .blocos-taxas .bloco-info .mes-atual');
const anoAtualTaxa = document.querySelectorAll('.intro-section .blocos-taxas .bloco-info .ano-atual');
const anoAnteriorTaxa = document.querySelector('.intro-section .blocos-taxas .bloco-info .ano-anterior');

mesTaxa.innerHTML = MesAnoAtual;
anoAtualTaxa.forEach(e => e.innerHTML = anoAtual);
anoAnteriorTaxa.innerHTML = anoAtual -1;

//---- definindo os dados das taxas
const apiCDI = "../APIs/cdi.json";

async function buscaDados(){
    try{
        const response = await fetch(apiCDI);
        const data = await response.json();
        //console.log(data.value)
        return data.value;

    }catch (error) {
        console.error('Erro ao carregar dados:', error);
        return [];
    }
}

const cdiMesAtual = document.querySelector('.intro-section .blocos-taxas .bloco-info .value-cdi-mes-atual');
const mediaCDI = document.querySelector('.intro-section .blocos-taxas .bloco-info .value-media-cdi');
const cdiAcumuladoAnoAtual = document.querySelector('.intro-section .blocos-taxas .bloco-info .value-cdi-acumulado-ano-atual');
const cdiAcumuladoAnoAnterior = document.querySelector('.intro-section .blocos-taxas .bloco-info .value-cdi-acumulado-ano-anterior');

const inputTaxaCDI = document.querySelector('main .formulario-section .form-itens .form-item #taxaCDI');
const inputPorcentagemCDI = document.querySelector('main .formulario-section .form-itens .form-item #percentualCDI');

buscaDados().then(dados => {
    let a = 0; //para calcular a media
    let x = 1; //para o calculo do acumulado atual
    let y = 1; //para o calculo do acumulado anterior
    dados.forEach(element => {
        let data = element.VALDATA.slice(0,7);
        let mes = data.slice(5);
        let ano = data.slice(0,4)
        let mesAno = mes + "/" + ano;

        if(mesAno === MesAnoAtual){ //definindo os dados do mes atual
            let cdiPorcent = element.VALVALOR
            cdiMesAtual.innerHTML = cdiPorcent.toFixed(2).replace(".",",") + "%";
        }
        
        if(ano === anoAtual.toString()){ //calculando o acumulado do ano atual
            a += element.VALVALOR; 
            let fatorMensal = 1 + (element.VALVALOR/100);
            x *= fatorMensal;
        }

        if(ano === (anoAtual -1).toString()){ //calculando o acumulado do ano anterior
            let fatorMensal = 1 + (element.VALVALOR/100);
            y *= fatorMensal;
        }
        
    });
    //console.log(a)
    mediaCDI.textContent = (a/mesAtual).toFixed(2).replace(".",",") + "%";

    const ValueCdiAcumuladoAnoAtual = (x - 1) * 100;
    cdiAcumuladoAnoAtual.innerHTML = ValueCdiAcumuladoAnoAtual.toFixed(2).replace(".",",") + "%";

    const ValueCdiAcumuladoAnoAnterior = (y - 1) * 100;
    cdiAcumuladoAnoAnterior.innerHTML = ValueCdiAcumuladoAnoAnterior.toFixed(2).replace(".",",") + "%";

    //definindo os valores dos inputs 
    inputTaxaCDI.value = (a/mesAtual).toFixed(2);
    inputPorcentagemCDI.value = 100;
    //retorno(inputTaxaCDI.value/100);

});

//--------------------------
// ------------------------- simulador

//variaves entrada
const initialInvest = document.querySelector('main .formulario-section .form-itens .form-item #initialInvest');
const monthInvest = document.querySelector('main .formulario-section .form-itens .form-item #monthInvest');
const inputIntervalo = document.querySelector('main .formulario-section .form-itens .form-item #intervalo');

//variaveis button
const buttonResulte = document.querySelector('main .formulario-section .buttons .resultado');
const buttonDelete = document.querySelector('main .formulario-section .buttons .delete');
const sectionResulte = document.querySelector('.resultado-section');

//variveis resultado
const totalDepositado = document.querySelector('.resultado-section .resultados .item-resultado #total-depositado');
const rendimento = document.querySelector('.resultado-section .resultados .item-resultado #rendimentos');
const totalFinal = document.querySelector('.resultado-section .resultados .item-resultado #total-final');
const porcentTotalFinal = document.querySelector('.resultado-section .resultados .item-resultado #porcent-total-final');


//exibindo resultado
buttonResulte.addEventListener('click', function(){
    buttonResulte.style.backgroundColor = '#2c3e50';
    sectionResulte.classList.remove('saida');
    sectionResulte.classList.add('entrada');
    sectionResulte.style.display = 'block';

    buscaDados().then(() => {
        if(initialInvest.value === '' && monthInvest.value === ''){
            console.log('Não irá calcular nada')
        } else {
            let definePorcentCDI = inputTaxaCDI.value*(inputPorcentagemCDI.value/100);

            if(inputIntervalo.value === '' || inputIntervalo.value === 0){
                inputIntervalo.value = 12
            }

            switch (SelectIntervaloP.textContent) {    
                case 'Meses':
                    

                    // definindo o valor total depositado
                    let valueDepositado = +initialInvest.value + monthInvest.value*(inputIntervalo.value-1)
                    totalDepositado.textContent = FormataValor(valueDepositado);
        
                    // definindo o valor dos rendimentos
                    let VFinicial = CalcVFI(+initialInvest.value, definePorcentCDI , inputIntervalo.value);
                    let VFmensal = CalcVFM(+monthInvest.value, definePorcentCDI, inputIntervalo.value-1);
                    rendimento.textContent = FormataValor(+ VFinicial + VFmensal - valueDepositado); 

                    //definindo o valor total
                    totalFinal.textContent = FormataValor(+ VFinicial + VFmensal);
                    porcentTotalFinal.textContent = `${(((+ VFinicial + VFmensal - valueDepositado)/valueDepositado)*100).toFixed(2).replace(".",",")}%`;

                    break;
                    
        
                default:
                    totalDepositado.textContent = FormataValor(+initialInvest.value + monthInvest.value*((inputIntervalo.value*12)-1));

                    // definindo o valor total depositado
                    let valueDepositado2 = +initialInvest.value + monthInvest.value*(inputIntervalo.value*12-1)
                    totalDepositado.textContent = FormataValor(valueDepositado2);
        
                    // definindo o valor dos rendimentos
                    let VFinicial2 = CalcVFI(+initialInvest.value, definePorcentCDI , inputIntervalo.value*12);
                    let VFmensal2 = CalcVFM(+monthInvest.value, definePorcentCDI, inputIntervalo.value*12-1);
                    rendimento.textContent = FormataValor(+ VFinicial2 + VFmensal2 - valueDepositado2); 

                    //definindo o valor total
                    totalFinal.textContent = FormataValor(+ VFinicial2 + VFmensal2);
                    porcentTotalFinal.textContent = `${(((+ VFinicial2 + VFmensal2 - valueDepositado2)/valueDepositado2)*100).toFixed(2).replace(".",",")}%`;

                    break;
                };
           
        };

    });
});

buttonDelete.addEventListener('click', function(){
    buttonResulte.style.backgroundColor = '';
    sectionResulte.classList.remove('entrada');
    sectionResulte.classList.add('saida');
    setTimeout(() => {
        sectionResulte.style.display = 'none';
    }, 100);

    initialInvest.value = '';
    monthInvest.value = '';
    inputIntervalo.value = '';

    totalDepositado.textContent = 'R$ 0,00';
    rendimento.textContent = 'R$ 0,00';
    totalFinal.textContent = 'R$ 0,00';
    porcentTotalFinal.textContent = '0%';
    
});

//--------------------------
// ------------------------- funções

//Valor Futuro do Valor Inicial
function CalcVFI(VP, i, n){
    let VF = VP*(1 + (i/100))**n;
    return VF;
};


//Valor Futuro das Contribuições Mensais
function CalcVFM(P, i, n){
    let VF = P*(((1 + (i/100))**n -1)/(i/100));

    return VF;
};


//------------
function FormataValor(number){
    let transfSrc = `${parseInt(number)}`;
    if(transfSrc.length < 4){ //999
        let src = `R$ ${number.toFixed(2)}`;

        return src.replace(".",",");

    } else if(transfSrc.length === 4 && transfSrc.length < 5){ //1.000
        let src = `${number.toFixed(2)}`;
        let srcAntes = src.substring(0,1);
        let srcDps = src.substring(1, src.length).replace(".",",");
        let vlFinal = `R$ ${srcAntes}.${srcDps}`;
        
        return vlFinal;

    } else if (transfSrc.length === 5 && transfSrc.length < 6){
        let src = `${number.toFixed(2)}`;
        let srcAntes = src.substring(0,2);
        let srcDps = src.substring(2, src.length).replace(".",",");
        let vlFinal = `R$ ${srcAntes}.${srcDps}`;
        
        return vlFinal;
    } else if (transfSrc.length === 6 && transfSrc.length < 7){
        let src = `${number.toFixed(2)}`;
        let srcAntes = src.substring(0,3);
        let srcDps = src.substring(3, src.length).replace(".",",");
        let vlFinal = `R$ ${srcAntes}.${srcDps}`;
        
        return vlFinal;
    } else if (transfSrc.length === 7 && transfSrc.length < 8){
        let src = `${number.toFixed(2)}`;
        let srcAntes = src.substring(0,1);
        let srcMeio = src.substring(1,4);
        let srcDps = src.substring(4, src.length).replace(".",",");
        let vlFinal = `R$ ${srcAntes}.${srcMeio}.${srcDps}`;
        
        return vlFinal;
    }
};
