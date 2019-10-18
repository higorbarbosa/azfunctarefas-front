const baseAddress = 'http://localhost:7071'; //'https://serverless-funcs-1.azurewebsites.net'; //'http://localhost:7071';
var app = new Vue({
    el: '#app',
    data: {
        tarefas: [
        ],
        newTask: "",
        error: undefined
    },
    methods: {
        criarTarefa: function() {
            fetch(`${baseAddress}/api/tarefa`, { method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({ nomeTarefa: this.newTask} )})
                .then(response => response.json())
                .then(json => {
                    this.tarefas.push(json);
                    this.newTask = '';
                })
                .catch(reason => this.error = `Falha ao criar tarefa: ${reason}`);
        },
        excluirTarefa: function(tarefa) {
            var tarefas = this.tarefas;
            fetch(`${baseAddress}/api/tarefa/${tarefa.id}`, { method: "DELETE",
                credentials: "same-origin"})
                .then(function() {
                    var index = tarefas.indexOf(tarefa);
                    if (index > -1) {
                        tarefas.splice(index, 1);
                    }
                })
                .catch(reason => this.error = `Falha ao excluir tarefa: ${reason}`);
        },
        atualizarTarefa: function(tarefa) {
            const body = JSON.stringify({ finalizada: tarefa.finalizada });
            fetch(`${baseAddress}/api/tarefa/${tarefa.id}`, 
                { method: "PUT", body: body,
                credentials: "same-origin"})
                .catch(reason => this.error = `Falha ao atualizar tarefa: ${reason}`);
        },     
    },
    mounted: function () {
        fetch(`${baseAddress}/api/tarefas`, { credentials: "same-origin" })
            .then(response => response.json())
            .then(json => this.tarefas = json)
            .catch(reason => this.error = `Falha ao listar todas tarefas: ${reason}`);
    },
});