$(document).ready(function(){
  $('#nomeUsuarioGit').on('keyup', function(e){
    let username = e.target.value;

    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
      	
      	client_id:'6e079a1181c376d18a00',
      	client_secret:'424fbdc11d250a2d6a549c2be05da38dbfc22408'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'6e079a1181c376d18a00',
          client_secret:'424fbdc11d250a2d6a549c2be05da38dbfc22408',

        }
      }).done(function(repositorios){
        // qtd = Object.keys(repos).length;;
        // for (i = 0; i < Object.keys(repos).length; i++) { 
        //   repo = repos[i];

        //Garantir que não fiquem repositórios de outros usuários na lista
        $('#repositorios').empty();

        $.each(repositorios, function(index, repo){
          tipoRepo = "Privado";
          if (repo.private != "true"){
            tipoRepo = "Público";
          }
          dateRepo = formataData(repo.created_at);

          $('#repositorios').append(`
            <div class="well">
              <h4 class="text-primary"> ${index+1}. ${repo.name}</strong> </h4>
              <div class="row">
                <div class="col-md-7">
                   <ul class="list-group">
                    <li class="list-group-item"><strong>Descrição</strong>: ${repo.description}</li>              
                  </ul>
                </div>
                <br><br>
                <div class="col-md-10">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Quantidade de Observadores: ${repo.watchers_count}</span>
                  <span class="label label-success">Quantidade de Estrelas: ${repo.stargazers_count}</span>
                  <span class="label label-info">Quantidade de Issues: ${repo.open_issues_count}</span>
                  <span class="label label-warning">Linguagem: ${repo.language}</span>
                  <span class="label label-danger">Data de Criação: ${dateRepo}</span>
                  <span class="label label-primary">Tipo do Repositório: ${tipoRepo}</span>
                  <br><br>
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Visitar Página do Repositório</a>
                </div>
              </div>
            </div>
          `);
        // }
        });
      });

      //Garantir que não liste falsos usuários(Nulos)
      if (user.name != null){
        $('#usuarioGit').html(`
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-success btn-block" href="${user.html_url}">Visitar Perfil Github</a>
              </div>
              <div class="col-md-9">
                <ul class="list-group">
                  <li class="list-group-item text-primary"><strong>Nome de Usuário:</strong> ${user.name}</li>
                  <li class="list-group-item"><strong>Numero de Seguidores:</strong> ${user.followers}</li>
                  <li class="list-group-item"><strong>Seguindo:</strong> ${user.following}</li>
                  <li class="list-group-item"><strong>Quantidade de repositórios públicos:</strong> ${user.public_repos}</li>
                  <li class="list-group-item"><strong>Membro desde:</strong> ${formataData(user.created_at)} </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Repositórios</h3>
        <div id="repositorios"></div>
      `);
      } else {
        //Limpar o elemento a fim de evitar conflitos.
        $('#usuarioGit').empty();
      }
      
    });
    function formataData(dataStr){
      // exemplo: "2010-01-18"
      dataArr = dataStr.split("-");
      dataArr2 = dataArr[2].split("T");  
      //exemplo: "18/01/2010"
      return dataArr[2].substring(0,2)+ "/" +dataArr[1]+ "/" +dataArr[0]; 
    }
  });
});
