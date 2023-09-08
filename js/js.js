const novaTarefa = document.querySelector('.novaTarefa')
const btnAddTarefa = document.querySelector('.btnAddTarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi(){
    const li = document.createElement('li')
    return li
}

novaTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
    if (!novaTarefa.value) return
    criaTarefa(novaTarefa.value)
    }
    
})

function limparInput(){
    novaTarefa.value = ''
    novaTarefa.focus()
}

function criaBtnApagar(li){
li.innerText += ' '  
const botaoApagar = document.createElement('button')
botaoApagar.innerHTML = 'Apagar'
li.appendChild(botaoApagar)
botaoApagar.setAttribute('class', 'apagar')
}

function criaTarefa(textoInput){
    const li = criaLi()
    li.innerHTML = textoInput
    tarefas.appendChild(li)
    limparInput()
    criaBtnApagar(li)
    salvarTarefas()
}

btnAddTarefa.addEventListener('click', function(){
    if (!novaTarefa.value) return
    criaTarefa(novaTarefa.value)
});

document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
addTarefasSalvas()

