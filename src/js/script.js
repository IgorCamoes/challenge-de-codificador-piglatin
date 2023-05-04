let mainInput = document.querySelector('.input textarea');
const buttonCrip = document.querySelector('button.cr');
const buttonDescrip = document.querySelector('button.ds');
const textArea = document.querySelector('.output');
const mainOutput = document.querySelector('.output .text-area p:first-child');
const spanOutput = document.querySelector('.output .text-area span p');

const vogaisNormais = ['a', 'e', 'i', 'o', 'u'];


const criptografarTexto = (texto) => {
  
  let arrPalavras = texto.split(' ');
  let textoCrip = [];

  for(let palavra of arrPalavras){
    let primeiraLetra = palavra.charAt(0);
    palavra = primeiraLetra.toUpperCase() + palavra.slice(1);
    

    //se a primeira letra for vogal
    if(vogaisNormais.includes(primeiraLetra)){
      textoCrip.push(palavra+'Yay');
    }
    //se a segunda letra também não for vogal
    else if(!vogaisNormais.includes(palavra.charAt(1))){
      let letras = palavra.slice(0, 2);
      palavra = palavra.slice(2) + letras + 'ay';
      textoCrip.push(palavra);
    }
    //se começar com consoante mas a segunda for vogal
    else{
      palavra = palavra.slice(1);
      textoCrip.push(palavra += primeiraLetra.toUpperCase() + 'ay');
    }
  }


  mainOutput.innerText = textoCrip.join(' ');
}

const descriptografarTexto = (texto) =>{

  let arrPalavras = texto.split(' ');
  let textoDescrip = [];


  for(let palavra of arrPalavras){
    if(palavra.slice(palavra.length - 2) == 'ay'){
      let novaPalavra = palavra.slice(0, -2);

      if(novaPalavra.charAt(novaPalavra.length - 1) == 'Y'){

        textoDescrip.push(novaPalavra.slice(0, -1));
      }else{

        textoDescrip.push(novaPalavra.charAt(novaPalavra.length - 1) + novaPalavra.slice(0, -1));
      }

    }
        
  }

  mainOutput.innerText = textoDescrip.join(' ');
}

const msgAlerta = (msg) =>{
    
  spanOutput.innerText = msg;

setTimeout(() =>{
  spanOutput.innerText = '';
}, 2000)
}


const tratarTexto = (texto, action) =>{
  if(mainInput.value != ''){
    let novoTexto = texto;

    novoTexto = novoTexto.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');

    if(action == 'd'){
      descriptografarTexto(novoTexto);
    }
    else{
      criptografarTexto(novoTexto);
    }
  }else{
    msgAlerta('Insira um texto válido.');
  }

  
}

const copiarTexto = () =>{
  if(mainOutput.innerText != ''){
    let textoAntigo = mainOutput.innerText;

    navigator.clipboard.writeText(mainOutput.innerText);


    mainOutput.innerText = '';

    msgAlerta('Copiado!');

    setTimeout(() => {
      mainOutput.innerText = textoAntigo;
    }, 2000);
  }
}


textArea.onclick = copiarTexto;





buttonCrip.onclick = () =>{
  tratarTexto(mainInput.value, 'c');
};

buttonDescrip.onclick = () =>{
  tratarTexto(mainInput.value, 'd');
}

