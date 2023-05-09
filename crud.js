document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar(){
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

    document.querySelector('#tarefas').innerHTML += gerar_card(tarefa)
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