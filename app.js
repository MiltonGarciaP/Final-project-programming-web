
  var firebaseConfig = {
  
    //Mi SDK de firebase//
    apiKey: "AIzaSyAN0Rbfk3XjR-_cGsyv1t0R6SSG0rUiJ-o",
    authDomain: "segundoparcial-61e04.firebaseapp.com",
    databaseURL: "https://segundoparcial-61e04-default-rtdb.firebaseio.com",
    projectId: "segundoparcial-61e04",
    storageBucket: "segundoparcial-61e04.appspot.com",
    messagingSenderId: "651472670154",
    appId: "1:651472670154:web:9348f9aeeaaf76bb3f9333"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  coleccionCrud = db.ref().child('Crud');
  bodydelCrud = $('#bodydelCrud').val();
  //console.log(bodydelCrud);  
  $('form').submit(function(e){
    e.preventDefault();
    let id = $('#id').val();
    let nombre = $('#nombre').val();
    let apellido = $('#apellido').val();
    let correo = $('#correo').val();
    let telefono = $('#telefono').val();
    let idFirebase = id;
    if(idFirebase == ''){
     idFirebase = coleccionCrud.push().key;
    };
    data = {nombre:nombre, apellido: apellido, correo: correo, telefono: telefono};
    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionCrud.update(actualizacionData);
    id = '';
    $
    ('form').trigger('reset');
    $('#modalAltaEdicion').modal('hide');
  });
  const iconoEditar = '<svg class="bi bi-pencil-square" width="0.7em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar = '<svg class="bi bi-trash" width="0.7em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
  function mostrardatos({nombre, apellido, correo, telefono}){
    return `
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${correo}</td>
    <td>${telefono}</td>
    <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
    `
  };
  //CHILD_ADDED
  coleccionCrud.on('child_added', data =>{
    let tr = document.createElement('tr')
    tr.id = data.key
    tr.innerHTML = mostrardatos(data.val())
    document.getElementById('bodydelCrud').appendChild(tr)
  });
  //CHILD_CHANGED
  coleccionCrud.on('child_changed', data =>{
    let nodoEditado = document.getElementById(data.key)
    nodoEditado.innerHTML = mostrardatos(data.val())
  });
  //CHILD_REMOVED
  coleccionCrud.on('child_removed', data =>{
    let nodoEditado = document.getElementById(data.key)
    document.getElementById('bodydelCrud').removeChild(nodoEditado)
  });
  //Programación de los botones
  $('#btnNuevo').click(function(){
    $('#id').val('');
    $('#nombre').val('');
    $('#apellido').val('');
    $('#correo').val('');
    $('#telefono').val('');
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaCrud').on('click', '.btnEditar', function(){
    let id = $(this).closest('tr').attr('id');
    let nombre = $(this).closest('tr').find('td:eq(0)').text();
    let apellido = $(this).closest('tr').find('td:eq(1)').text();
    let correo = $(this).closest('tr').find('td:eq(2)').text();
    let telefono = $(this).closest('tr').find('td:eq(3)').text();
    $('#id').val(id);
    $('#nombre').val(nombre);
    $('#apellido').val(apellido);                
    $('#correo').val(correo); 
    $('#telefono').val(telefono);                
    $('#modalAltaEdicion').modal('show');
  });
  $('#tablaCrud').on('click', '.btnBorrar', function(){
      Swal.fire({
        title: '¿Está seguro de eliminar este dato?',
        text: "¡Una vez borrado no podra recuperar los datos!",
        icon: 'ALERTA',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let id = $(this).closest('tr').attr('id');
            db.ref(`Crud/${id}`).remove()  
            Swal.fire('¡Eliminado!', 'El dato seleccionado fue eliminado.','Completado')
        }
        })        
  });