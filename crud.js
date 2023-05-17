document.querySelector("#salvar").addEventListener("click", cadastrar)

let listatarefas = []

window.addEventListener("load", () => {
  listatarefas = JSON.parse(localStorage.getItem("listatarefas")) || []
  atualizar()
})

document.querySelector("#pendentes").addEventListener("click", () => {
  listatarefas = listatarefas.filter(tarefa => !tarefa.concluida)
  atualizar()
})

document.querySelector("#concluidas").addEventListener("click", () => {
  listatarefas = listatarefas.filter(tarefa => !tarefa.concluida)
  atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
  listatarefas = JSON.parse(localStorage.getItem("listatarefas")) || []
  const titulo = document.querySelector("#busca").value
  listatarefas.filter(tarefa => tarefa.titulo.includes(titulo))
  atualizar()
})

function cadastrar() {
  const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
  let titulo = document.querySelector("#titulo").value
  let descricao = document.querySelector("#descricao").value
  let pontos = document.querySelector("#pontos").value
  let categoria = document.querySelector("#categoria").value

  const tarefa = {
    id: Date.now(),
    titulo,
    descricao,
    pontos,
    categoria,
    concluida: false
  }

  if (tarefa.titulo.length == 0) {
    document.querySelector("#titulo").classList.add("is-invalid")
    return
  }

  listatarefas.push(tarefa)

  document.querySelector('#tarefas').innerHTML += gerar_card(tarefa)

  document.querySelector("#titulo").value = ""
  document.querySelector("#descricao").value = ""

  localStorage.setItem("listatarefas", JSON.stringify(listatarefas))

  modal.hide()
}

function atualizar() {
  document.querySelector("#tarefas").innerHTML = ""
  listatarefas.forEach((tarefa) => {
    document.querySelector("#tarefas").innerHTML += gerar_card(tarefa)
  })
}

function salvar() {
  localStorage.setItem("lista_tarefas", JSON.stringify(listatarefas))
}

function apagar(id) {
  listatarefas = listatarefas.filter(tarefa => tarefa.id != id) //arrow function
  salvar()
  atualizar()
}

function concluir(id){
  let tarefa_encontrada = listatarefas.find(tarefa => tarefa.id == id)
  tarefa_encontrada.concluida = true
  salvar()
  atualizar()
}


function gerar_card(tarefa) {
  const disabled = (tarefa.concluida) ? "disabled" : ""
  return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card">
      <div class="card-header">
        ${tarefa.titulo}
      </div>
      <div class="card-body">
        <p class="card-text">
        ${tarefa.descricao}
        </p>
        <p>
          <span class="badge text-bg-warning">
            ${tarefa.categoria}
          </span>
        </p>
        <p>${tarefa.pontos}pontos</p>
        <a href="#" onClick="concluir(${tarefa.id})" class="btn btn-success ${disabled}">
          <i class="bi bi-check2-circle"></i>
        </a>
        <a href="#" onClick="apagar(${tarefa.id})" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
        </a>
      </div>

    </div>
  </div>`
}