// ==== Mudanças sendo feitas 30-04-2019
// - Mudando o nome divLesao para divCategorias
// - Mudando tipoLesao para tipoCategoria

  var bigOne = document.getElementById('lesao1');
  var dbRef = firebase.database().ref('lesoes/');
  var dbRefCat = firebase.database().ref('categoria/');
  var dbRefSubCat = firebase.database().ref('sub_categoria/');
  var newDiv = "" ;


  
  //.... Continuar 
  dbRefCat.once('value', function(snapshot){
    var idCategoria = queryString("tipoCategoria");
    //alert("Id Lesão1: "+idCategoria);
    if(idCategoria == null || idCategoria =='' || idCategoria == 'undefined'){

      if(document.getElementById('divCategorias')){

        document.getElementById('divCategorias').innerHTML = "";
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
            newDiv += '<button type="button" class="list-group-item list-group-item-action mb-1 btLista"id="'+childData.id_categoria+'">'+childData.nome+'</button>';
            document.getElementById('divCategorias').innerHTML = newDiv;
            document.getElementById('divLoading').innerHTML = "";
            
           });
      }
    }
    else
    { 
      if(!document.getElementById('divSubCategorias')){
       dbRef.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
          //alert(childData.idLesao+" ## " +idCategoria);
            var img1 = "";
            var img2 = "";
            var img3 = "";
          if(childData.idLesao == idCategoria){
            // alert(childData.descricao);
            // Colocar exibirção da categoria e subcategoria
            // Colocar esses campos na tela de exibição
           // document.getElementById('idCategoria').innerText = childData.categoria;
            //document.getElementById('idSubCategoria').innerText = childData.sub_categoria;
            document.getElementById('idDescricao').innerText = childData.descricao;
            document.getElementById('idClinico').innerText = childData.clinico;
            document.getElementById('idDiagnostico').innerText = childData.diagnostico;
            document.getElementById('idHistologico').innerText = childData.histologico;
            document.getElementById('idRadiologico').innerText = childData.radiologico;
            document.getElementById('idTratamento').innerText = childData.tratamento;
            
            if(childData.imagem != undefined)
            {
               img1 = '<img src="'+childData.imagem+' " class="imgDetalhe" id="imgClinica">'; 
            }

            if(childData.imagem2 != undefined)
            {
               img2 = '<img src="'+childData.imagem2+'" class="imgDetalhe" id="imgClinica2">';
            }

            if(childData.imagem3 != undefined)
            {
              img3 = '<img src="'+childData.imagem3+'" class="imgDetalhe" id="imgClinica3">';
            }
            //alert(img1+" \n "+img2+" \n "+img3);
            document.getElementById('divImgClinica').innerHTML  = img1;
            document.getElementById('divImgClinica2').innerHTML = img2;
            document.getElementById('divImgClinica3').innerHTML = img3;
            document.getElementById('divLoading').innerHTML = "";
           }
        });
       });
    }
  }
});

dbRefSubCat.once('value', function(snapshot)  {

   var idCategoria = queryString("tipoCategoria");  
  // alert(document.getElementById('divSubCategorias'));    
      if(document.getElementById('divSubCategorias')){       
         document.getElementById('divSubCategorias').innerHTML = "";
          
          snapshot.forEach(function(childSnapshot){
            
            var childData = childSnapshot.val();
             //alert(idCategoria+" -- "+childSnapshot.val().id_categoria);
             if(idCategoria == childSnapshot.val().id_categoria)
             {
                newDiv += '<button type="button" class="list-group-item list-group-item-action mb-1 btLista"id="'+childData.id_categoria+'">'+childData.nome+'</button>';
                document.getElementById('divSubCategorias').innerHTML = newDiv;
                document.getElementById('divLoading').innerHTML = "";   
             }     
        });  
      }  
 });

$("body").on('click', '#divSubCategorias button', function(){
    var id = $(this).attr('id');
    existeLesao = false
    linkNovaPagina = "casosClinicos.html"
    //callAnothePage(linkNovaPagina, id);
    // Verificar se a categoria possui alguma subcategoria, se sim, listar as subcategorias
    dbRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){ 
           var childKey = childSnapshot.key;
          // Mudar o nome do id_catergoria para id_categoria
           if(id == childSnapshot.val().id_catergoria)
           {      
              //Verificar isso: Tá passando o id da categoria
              //alert(id+" -- "+childSnapshot.val().idLesao);   
              existeLesao = true  
              callAnothePage(linkNovaPagina, childSnapshot.val().idLesao);
           }
        });
        if(!existeLesao)
        {
            alert("Não existem lesões cadastradas para essa sub categoria!")
        } 
    });
});  
$("body").on('click', '#divCategorias button', function(){
    var id = $(this).attr('id');
    var existeLesao = false
    linkNovaPagina = "casosClinicos.html"
    dbRefSubCat.on('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){ 
               var childKey = childSnapshot.key;
               
               if(id == childSnapshot.val().id_categoria && !existeLesao)
               {
                  linkNovaPagina = "subcategorias.html";
                  existeLesao = true
                  //alert("Ta repassando a categorias..");  
                  callAnothePage(linkNovaPagina, id);
               }
            });
        dbRef.on('value', function(snapshot2){
            snapshot2.forEach(function(childSnapshot2){ 
               var childKey = childSnapshot2.key;
                
                // Mudar o nome do id_catergoria para id_categoria
               if(id == childSnapshot2.val().id_catergoria && !existeLesao)
               {      
                    //Verificar isso: Tá passando o id da categoria
                  //alert("Ta repassando a lesão..");  
                  existeLesao = true    
                  callAnothePage(linkNovaPagina, childSnapshot2.val().idLesao);
               }
            });
            if(!existeLesao)
            {
              alert("Não existem lesões cadastradas para essa categoria!")
            } 
      }); 
    });
});  

// função pra ler querystring
function queryString(parameter) {  
              var loc = location.search.substring(1, location.search.length);   
              var param_value = false;   
              var params = loc.split("&");   
              for (i=0; i<params.length;i++) {   
                  param_name = params[i].substring(0,params[i].indexOf('='));   
                  if (param_name == parameter) {                                          
                      param_value = params[i].substring(params[i].indexOf('=')+1)   
                  }   
              }   
              if (param_value) {   
                  return param_value;   
              }   
              else {   
                  return undefined;   
              }   
}

//var variavel = queryString("tipoLesao");

function callAnothePage(path, valor)
{
  urlNovaPagina = path+"?tipoCategoria="+valor;
  try {
    var nomeUser = document.getElementById("idNomeUsuario").value;
    window.localStorage.setItem("nomeUser", nomeUser);
  }
  catch (e) {}

   $("body").fadeOut(200,function(){
       window.location = urlNovaPagina;
    });
}
//Faz a mesma função do botão voltar do navegador
function goBack() {
    window.history.back()
}
function exitFromApp(){
   console.log("Fechando Aplicação");
   window.localStorage.removeItem("nomeUser");
   navigator.app.exitApp();
}

var app = {
    // Application Constructor

    initialize: function() {
      if(document.getElementById("nomeUser")){
         var nome = window.localStorage.getItem("nomeUser");
         document.getElementById("nomeUser").innerHTML = nome;
         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
     }
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();