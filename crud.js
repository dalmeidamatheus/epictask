document.querySelector("#salvar").addEventListener("click", cadastrar)

let listatarefas = []

window.addEventListener("load", () => {
  listatarefas = JSON.parse(localStorage.getItem("listatarefas"))
  listatarefas.forEach((tarefa) => {
    document.querySelector("#tarefas").innerHTML += gerar_card(tarefa)
  })
})

function cadastrar(){
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let titulo = document.querySelector("#titulo").value
    let descricao = document.querySelector("#descricao").value
    let pontos = document.querySelector("#pontos").value
    let categoria = document.querySelector("#categoria").value

    const tarefa = {
        titulo,
        descricao,
        pontos,
        categoria
    }

    if(tarefa.titulo.length == 0){
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

function apagar(botao){
  botao.parentNode.parentNode.parentNode.remove()
}

function gerar_card(tarefa){
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
        <a href="#" class="btn btn-success">
          <i class="bi bi-check2-circle"></i>
        </a>
        <a href="#" onClick="apagar(this)" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
        </a>
      </div>

    </div>
  </div>`
}