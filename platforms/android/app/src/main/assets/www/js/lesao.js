
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
   document.getElementById('divLesoes').innerHTML = "";
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      alert(childData.nomeLesao);
      novaPagina = 'callAnothePage("casosClinicos.html")';
      newDiv += '<button type="button" class="list-group-item list-group-item-action mb-1 btLista"id="'+childData.idLesao+'">'+childData.nomeLesao+'</button>';

      document.getElementById('divLesoes').innerHTML = newDiv;
    });
  });

$("body").on('click', '#divLesoes button', function(){
    var id = $(this).attr('id');
    callAnothePage("casosClinicos.html", id);
});  

$("#bt_buscar_lesao").click(function(){
    var nome = document.getElementById('idBucar').value;
   alert(nome);
    var desc = "descricao teste";
    var cli = "Caso teste";
    var img = "img teste";
    salvarLesao(nome,desc,cli,img);

});

function salvarLesao(nome, desc, cli, img) {
  // A post entry.
  var postData = {
    nomeLesao: nome,
    descricao: desc,
    clinico: cli,
    imagem: img
  };

  // Get a key for a new Post.
  var idLesao = firebase.database().ref().child('lesao').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/lesoes/' + idLesao] = postData;

  return firebase.database().ref().update(updates);
}