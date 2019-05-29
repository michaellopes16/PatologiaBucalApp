var divListaCategorias = '<option selected>Escolher...</option></select>';
var divListaSubCategorias = '<option selected>Escolher...</option></select>';
var divListaCategoriasModal = '';
var divListaSubCategoriasModal = '';
var childDataCat = [];
var childData_Sub_Cat = [];
var opcao = '';
var dbCat = firebase.database().ref('categoria/');
document.getElementById('id_categorias').innerHTML = "Categiria 1";
						
dbCat.on('value', function(snapshot){

	if(document.getElementById('id_categorias')){
	  
	 // document.getElementById('div_lista_categoria').innerHTML = "";
	  divListaCategoriasModal = "";
	  divListaCategorias ='<option selected>Escolher...</option></select>';
  	document.getElementById('id_categorias').innerHTML = "";

      snapshot.forEach(function(childSnapshot){ 	 
        childDataCat.push(childSnapshot);
        var childKey = childSnapshot.key;
	        divListaCategorias += '<option>'+childSnapshot.val().nome+'</option>';

	        divListaCategoriasModal += '<div class="form-row"> <div class="col-md-7 id="div">'
	        divListaCategoriasModal += '<input type="text" class="form-control mt-1" id="id_list:'+childKey+'" value="'+childSnapshot.val().nome+'">';
	        divListaCategoriasModal += '</div><div class="col-md-2 mr-2"><button type="button" id="id_bt_save:'+childKey+'"  class="btn btn-primary mt-1" >Salvar</button>'
	        divListaCategoriasModal += '</div><div class="col-md-2 mr-2"><button type="button" class="btn btn-danger mt-1" id="id_bt_ex:'+childKey+'"  >Excluir</button></div></div>'
	        
	        document.getElementById('id_categorias').innerHTML = divListaCategorias;
	        document.getElementById('div_lista_categoria').innerHTML = '<div class="list-group mt-3">'+divListaCategoriasModal+'</div>';
			    document.getElementById('divLoading').innerHTML = "";
      });
    }
  });

var dbSubCat = firebase.database().ref('sub_categoria/');


document.getElementById("id_categorias").onclick = function() {
    var categoria = document.getElementById("id_categorias");
    opcao = categoria.options[categoria.selectedIndex].text;
  //  divListaSubCategorias ='<option selected>Escolher...</option></select';

    if(opcao == "Escolher...")
	{   
		//alert(opcao);
		document.getElementById("id_div_principal").style.display = 'none';
		document.getElementById("id_sub_categorias").disabled = true;
		document.getElementById("id_bt_gerenciar_sub").disabled = true;

	}
	else
	{
    //alert("Apagando...")
		document.getElementById("id_div_principal").style.display = 'block';
		document.getElementById("id_sub_categorias").disabled = false;
		document.getElementById("id_bt_gerenciar_sub").disabled = false;
		childData_Sub_Cat = [];
    divListaSubCategoriasModal = "";
    document.getElementById('div_lista_sub_categoria').innerHTML = "";
	 	//document.getElementById('id_sub_categorias').innerHTML  = '<option selected>Escolher...</option></select>';
		    
    dbSubCat.on('value', function(snapshot){

			if(document.getElementById('id_sub_categorias')){

        divListaSubCategoriasModal = "";
        divListaSubCategorias = '<option selected>Escolher...</option></select>';
        document.getElementById('id_sub_categorias').innerHTML  = divListaSubCategorias;
		  	  //document.getElementById('id_sub_categorias').innerHTML = "";
		    snapshot.forEach(function(childSnapshot){ 

			  var childKey = childSnapshot.key;


			    childDataCat.forEach(function(cat){
			      		                
			      		if(opcao == cat.val().nome)
			      		{	
                  //alert(cat.val().id_categoria == childSnapshot.val().id_categoria)
			      			if(cat.val().id_categoria == childSnapshot.val().id_categoria){
			      				  childData_Sub_Cat.push(childSnapshot);
                      divListaSubCategorias += '<option>'+childSnapshot.val().nome+'</option>';		  

                      divListaSubCategoriasModal += '<div class="form-row"> <div class="col-md-7 id="div">'
                      divListaSubCategoriasModal += '<input type="text" class="form-control mt-1" id="id_list:'+childKey+'" value="'+childSnapshot.val().nome+'">';
                      divListaSubCategoriasModal += '</div><div class="col-md-2 mr-2"><button type="button" id="id_bt_save:'+childKey+'"  class="btn btn-primary mt-1" >Salvar</button>'
                      divListaSubCategoriasModal += '</div><div class="col-md-2 mr-2"><button type="button" class="btn btn-danger mt-1" id="id_bt_ex:'+childKey+'"  >Excluir</button></div></div>'
                      
                      document.getElementById('id_sub_categorias').innerHTML = divListaSubCategorias;
                      document.getElementById('div_lista_sub_categoria').innerHTML = '<div class="list-group mt-3">'+divListaSubCategoriasModal+'</div>';
                      document.getElementById('divLoading').innerHTML = "";        
			      			}
			      		}

			   		});  
		      });
		    }
		  });
	}

    console.log("O indice é: " + categoria.selectedIndex);
    console.log("O texto é: " + categoria.options[categoria.selectedIndex].text);
    console.log("A chave é: " + categoria.options[categoria.selectedIndex].value);
};

if(document.getElementById('upImagemClinica'))
{
    var upImagemClinica = document.getElementById('upImagemClinica');
    var upImagemHisto   = document.getElementById('upImagemHisto');
    var upImagemRadio   = document.getElementById('upImagemRadio');
    var uploader1   = document.getElementById('uploader1');
    var uploader2   = document.getElementById('uploader2');
    var uploader3   = document.getElementById('uploader3');

    upImagemClinica.addEventListener('change', function(e){
      //Get File
      var file = e.target.files[0]; 
      console.log('File available at', saveImage(file, uploader1, "URL_img1"));
    });
    upImagemHisto.addEventListener('change', function(e){
      //Get File
      var file = e.target.files[0]; 
      console.log('File available at', saveImage(file, uploader2, "URL_img2"));
    });
    upImagemRadio.addEventListener('change', function(e){
      //Get File
      var file = e.target.files[0]; 
      console.log('File available at', saveImage(file, uploader3, "URL_img3"));
    });
}

function saveImage(file, uploader1, storageImg)
{
  var storagaRef = firebase.storage().ref('imagens_clinicas/'+file.name); 
  //upload file
  var task = storagaRef.put(file);
  
  //upload progress bar
  task.on('state_changed',

    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      uploader1.value = percentage;
    },
    function error (err){

    },

    function complete(){
      // Upload completed successfully, now we can get the download URL
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //console.log('File available at', downloadURL);
            window.localStorage.setItem(storageImg, downloadURL);
          }
        );
    }, 
  );
}

$("#bt_salvar_categoria").click(function(){
	
	var nova_categoria = document.getElementById("id_campo_categoria").value;

	if(salvarCategoria(nova_categoria))
	{
		alert("Categoria Salva!");
	}

});

$("#bt_salvar_sub_categoria").click(function(){
  
  var nova_sub_categoria = document.getElementById("id_campo_sub_categoria").value;

  if(salvarSubcategoria(nova_sub_categoria))
  {
    alert("Sub Categoria Salva!");
   
  }

});

$("#bt_salvar_lesao").click(function(){

   var id_categoria = '';
   var id_sub_cat = '';
   
   var categoria_value = document.getElementById("id_categorias");
   var categoria = categoria_value.options[categoria_value.selectedIndex].value;

   var sub_cat_value = document.getElementById("id_sub_categorias");  
   var sub_cat = sub_cat_value.options[sub_cat_value.selectedIndex].value;

   childDataCat.forEach(function(cat){
      		if(categoria == cat.val().nome)
      		{
      			id_categoria = cat.key;
      			//alert(id_categoria)
      		}
   	});

   childData_Sub_Cat.forEach(function(s_cat){
      		if(sub_cat == s_cat.val().nome)
      		{
      			id_sub_cat = s_cat.key;
      			//alert(id_sub_cat)
      		}
   	});

   var nome = document.getElementById('idNome').value;
   var descricao = document.getElementById('idDescricao').value;
   var clinico = document.getElementById('idClinico').value;
   var histologico = document.getElementById('idHistologico').value;
   var diagnostico = document.getElementById('idDiagnostico').value;
   var radiologico = document.getElementById('idRadiologico').value;
   var tratamento = document.getElementById('idTratamento').value;
   img = window.localStorage.getItem("URL_img1");
   img2 = window.localStorage.getItem("URL_img2");
   img3 = window.localStorage.getItem("URL_img3");
    

   salvou = salvarLesao(nome, descricao, clinico, img,img2, img3,  radiologico, histologico, tratamento, diagnostico,categoria,id_categoria,sub_cat,id_sub_cat);
   callAnothePage("lesoes.html")
   alert("Lesão salva com sucesso!");
});

$("body").on('click', '#div_lista_categoria input', function(){
        var id = $(this).attr('id');
        var item = id.split(':');
});  

$("body").on('click', '#div_lista_categoria button', function(){
 	//var id_cat = firebase.database().ref().child('categoria').push().key;
// id_sub_categorias
 var id = $(this).attr('id');
 var item = id.split(':');
 var postData = '';
 var id_sub_cat = "";
 var id_cat = item[1];
 var id_input = "id_list:"+item[1];
 var nova_cat = document.getElementById(id_input).value;
 
 if(item[0] == "id_bt_save"){
	 dbCat.on('value', function(snapshot){
	  
		    snapshot.forEach(function(childSnapshot){ 	 
		    childDataCat.push(childSnapshot);
		    
			    var childKey = childSnapshot.key;

			    if(childKey == id_cat)
			    {
					postData = {
				 		  nome: nova_cat,
				  		id_categoria: childSnapshot.val().id_categoria,
					};
			    }
		      });
		  });
	 
		var updates = {};
		console.log("Categoria atualizada:"+postData);
		updates['/categoria/' + id_cat] = postData;

		if(firebase.database().ref().update(updates))
		{
			alert("Categoria atualizada!");
			document.getElementById(id_input).style.border = '2px solid #00FF00';
		}
	}else
	{
		 if(firebase.database().ref().child('/categoria/'+id_cat).remove())
		 {
		 	alert("Categoria removida!");
		 }
	}
});  

$("body").on('click', '#div_lista_sub_categoria input', function(){
        var id = $(this).attr('id');
        var item = id.split(':');
});  
$("body").on('click', '#div_lista_sub_categoria button', function(){
 var id = $(this).attr('id');
 var item = id.split(':');
 var postData = '';
 var id_sub_cat = item[1];
 var id_input = "id_list:"+item[1];
 var nova_sub_cat = document.getElementById(id_input).value;
 
 if(item[0] == "id_bt_save"){
   dbSubCat.on('value', function(snapshot){
    
        snapshot.forEach(function(childSnapshot){

          childData_Sub_Cat.push(childSnapshot);
          var childKey = childSnapshot.key;

            if(childKey == id_sub_cat)
            {
              postData = {
                  nome: nova_sub_cat,
                  id_categoria: childSnapshot.val().id_categoria,
              };
            }
        });
   });
   
    var updates = {};
    console.log("Sub categoria atualizada:"+postData);
    updates['/sub_categoria/' + id_sub_cat] = postData;

    if(firebase.database().ref().update(updates))
    {
      alert("Sub categoria atualizada!");
    }
  }else
  {
     if(firebase.database().ref().child('/sub_categoria/'+id_sub_cat).remove())
     {
      alert("Sub categoria removida!");
     }
  }
}); 

function salvarSubcategoria(nova_sub_cat)
{
  var id_sub_cat = firebase.database().ref().child('sub_categoria').push().key;

  var categoria_value = document.getElementById("id_categorias");
  var categoria = categoria_value.options[categoria_value.selectedIndex].value;
  id_categoria = ""
  podeInserir = true
   //alert(document.getElementById("id_sub_categorias").value)
  if(document.getElementById("id_sub_categorias").value != ""){
       var sub_categoria = document.getElementById("id_campo_sub_categoria").value;
  }else
  {
       sub_categoria = "";
  }
  childDataCat.forEach(function(cat){
          if(categoria == cat.val().nome)
          {
            id_categoria = cat.key; 
          }
  });

  childData_Sub_Cat.forEach(function(s_cat){
          if(sub_categoria == s_cat.val().nome)
          {
            //id_sub_cat = s_cat.key;
            alert("Sub Categoria Já existe!")
            podeInserir = false
          }
  });

  if(podeInserir){
    var postData = {
        nome: sub_categoria,
        id_categoria: id_categoria    
    };

    var updates = {};
    updates['/sub_categoria/' + id_sub_cat] = postData;
    return firebase.database().ref().update(updates);
  }

}

function salvarCategoria(nova_cat)
{
 	var id_cat = firebase.database().ref().child('categoria').push().key;

 	var postData = {
 		  nome: nova_cat,
  		id_categoria: id_cat,		 
	};

	var updates = {};
	updates['/categoria/' + id_cat] = postData;

	return firebase.database().ref().update(updates);
}
function salvarLesao(nome, desc, cli, img,img2,img3, radio, histo, trata, diag, cat,id_cat,sub_cat,id_sub_cat ) {
  // A post entry.
    // Get a key for a new Post.
  var idLesao = firebase.database().ref().child('lesoes').push().key;
    //var idLesao = firebase.database().ref().child('categoria').push().key;
  if(sub_cat == "Escolher...")
  {
      sub_cat = "Não definida."
  }  
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
    imagem3: img3,
    categoria:cat,
    id_catergoria:id_cat,
    sub_categoria:sub_cat,
    id_sub_categoria: id_sub_cat
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/lesoes/' + idLesao] = postData;

  return firebase.database().ref().update(updates);
}
