/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
  var config = {
    apiKey: "AIzaSyBi_27p1zjDPrgXHLJ2BoJy4MlmA1ly6ao",
    authDomain: "patologiabucalapp.firebaseapp.com",
    databaseURL: "https://patologiabucalapp.firebaseio.com",
    projectId: "patologiabucalapp",
    storageBucket: "patologiabucalapp.appspot.com",
    messagingSenderId: "603741163304"
  };
  firebase.initializeApp(config);

  var bigOne = document.getElementById('lesao1');
  var dbRef = firebase.database().ref('lesoes/');
  var newDiv = "" ;


  dbRef.once('value', function(snapshot){
   var idLesao = queryString("tipoLesao");
    //alert(idLesao);
    if(idLesao == null || idLesao =='' || idLesao == 'undefined'){

     if(document.getElementById('divLesoes')){

        document.getElementById('divLesoes').innerHTML = "";
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
            //alert(childData.nomeLesao);
            novaPagina = 'callAnothePage("casosClinicos.html")';
            newDiv += '<button type="button" class="list-group-item list-group-item-action mb-1 btLista"id="'+childData.idLesao+'">'+childData.nomeLesao+'</button>';
            document.getElementById('divLesoes').innerHTML = newDiv;
            document.getElementById('divLoading').innerHTML = "";
            
           });
      }
    }else
    {  
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();

        if(childData.idLesao == idLesao){
           //alert(childData.descricao);
           
          document.getElementById('idDescricao').innerText = childData.descricao;
          document.getElementById('idClinico').innerText = childData.clinico;
          document.getElementById('idDiagnostico').innerText = childData.diagnostico;
          document.getElementById('idHistologico').innerText = childData.histologico;
          document.getElementById('idRadiologico').innerText = childData.radiologico;
          document.getElementById('idTratamento').innerText = childData.tratamento;
          document.getElementById('divImgClinica').innerHTML  = '<img src="'+childData.imagem+' " class="imgDetalhe" id="imgClinica">';
          document.getElementById('divImgClinica2').innerHTML = '<img src="'+childData.imagem2+'" class="imgDetalhe" id="imgClinica2">';
          document.getElementById('divImgClinica3').innerHTML = '<img src="'+childData.imagem3+'" class="imgDetalhe" id="imgClinica3">';
          document.getElementById('divLoading').innerHTML = "";
         }
      });
    }


    
  });

$("body").on('click', '#divLesoes button', function(){
    var id = $(this).attr('id');
    callAnothePage("casosClinicos.html", id);
});  
/*
$("#bt_buscar_lesao").click(function(){
    var nome = document.getElementById('idBucar').value;
   alert(nome);
    var desc = "descricao teste";
    var cli = "Caso teste";
    var img = "img teste";
    salvarLesao(nome, desc, cli, img,"img2", "img3",  "radio", "histo", "trata", "diag" );

});
*/
function salvarLesao(nome, desc, cli, img,img2,img3, radio, histo, trata, diag ) {
  // A post entry.
    // Get a key for a new Post.
  var idLesao = firebase.database().ref().child('lesoes').push().key;

  var postData = {
    nomeLesao: nome,
    descricao: desc,
    clinico: cli,
    diagnostico: diag,
    histologico: histo,
    radiologico: radio ,
    tratamento: trata,
    idLesao: idLesao,
    imagem: img,
    imagem2: img2,
    imagem3: img3
  };



  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/lesoes/' + idLesao] = postData;

  return firebase.database().ref().update(updates);
}
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
  urlNovaPagina = path+"?tipoLesao="+valor;
  try {
    var nomeUser = document.getElementById("idNomeUsuario").value;
    window.localStorage.setItem("nomeUser", nomeUser);
  }
  catch (e) {}

   $("body").fadeOut(200,function(){
       window.location = urlNovaPagina;
    });
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