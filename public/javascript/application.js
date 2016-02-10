function all(users){
  $('.menu').hide();
  $('#listall').empty();
  $('#listall').append("<h2>Contacts</h2>");
  $.each(users, function(index, user){
    var div1 = $('<div>');
    var p1 = $('<p>');
    var p2 = $('<p>');
    var p3 = $('<p>');
    p1.append('Name:',user.name);
    p2.append('Email:',user.email);
    p3.append('Phone:',user.phone);
    div1.append(p1,'<br>',p2,'<br>',p3,'<br>');
    div1.addClass("well");
    $('#listall').append(div1);
  });
  $('#home').show();
};

function find_submit(){
  var id = '/'+ $('#findid').val();
  event.preventDefault();          
  if (id == "/"){
    alert("Please enter Id")
    return false;
  }
  $('#listall').empty();
  $.ajax({
    url: id,
    method: 'GET',
    success: function (user) {
      user =  JSON.parse(user);
      var div1 = $('<div>');
      var p1 = $('<p>');
      var p2 = $('<p>');
      var p3 = $('<p>');
      p1.append('Name:',user.name);
      p2.append('Email:',user.email);
      p3.append('Phone:',user.phone);
      div1.append(p1,'<br>',p2,'<br>',p3,'<br>');
      div1.addClass("well");
      $('#listall').append(div1);
    },
    error: function() { 
      $('#listall').append("<h3>User Not Found or invalid Id</h3>"); 
    } 
  });
  $('#findid').val('');  
};

function search_submit(){
  var query = '/search/'+ $('#query').val();
  event.preventDefault();          
  if (query == "/search/"){
    alert("Please enter a search term")
    return false;
  }
  $('#listall').empty();
  $.getJSON(query, function(users){
    if (users.length == 0) {
      $('#listall').append("<h3>No Matches!</h3>");
    }
    else {
      $.each(users, function(index, user){
        var div1 = $('<div>');
        var p1 = $('<p>');
        var p2 = $('<p>');
        var p3 = $('<p>');
        p1.append('Name:',user.name);
        p2.append('Email:',user.email);
        p3.append('Phone:',user.phone);
        div1.append(p1,'<br>',p2,'<br>',p3,'<br>');
        div1.addClass("well");
        $('#listall').append(div1);
      });
    }
  });

  $('#query').val('');  
};

function update_submit() {
  var id = $("#updateid").val();
  var name = $("#nameu").val();  
  var email = $("#emailu").val();
  var phone = $("#phoneu").val();
  event.preventDefault();
  if (id == "" || name == "" || email == "" || phone == "") {
    alert("You must fill out all fields!");
    return false;      
  }
  $('#listall').empty();
  $.ajax({
    url: '/update',
    method: 'POST',
    data: {id: id, name: name, email: email, phone: phone},
    success: function () {
      $('#listall').append("<h3>User updated succesfully!</h3>");
    },
    error: function() { 
      $('#listall').append("<h3>User Not Found or invalid Id</h3>"); 
    } 
  });  
  $("#updateid").add("#nameu").add("#emailu").add("#phoneu").val('');
};

function delete_submit() {
  var id = $("#deleteid").val(); 
  event.preventDefault();
  if (id == "" ) {
    alert("Please Enter Id");
    return false;      
  }
  $('#listall').empty();
  $.ajax({
    url: '/delete',
    method: 'POST',
    data: {id: id},
    success: function () {
      $('#listall').append("<h3>User deleted succesfully!</h3>");
    },
    error: function() { 
      $('#listall').append("<h3>User Not Found or invalid Id</h3>"); 
    } 
  });  
  $("#deleteid").val('');
};

function form_submit() {
    var name = $("#name").val();  
    var email = $("#email").val();
    var phone = $("#phone").val();
    event.preventDefault();
    if (name == "" || email == "" || phone == "") {
      alert("You must fill out all fields!");
      return false;      
    }

    $.post('/users', {name: name, email: email, phone: phone}, function(data) {
      if (data.result) {
        $("#name").add("#email").add("#phone").val('');
        alert("New user with id " + data.id + " successfully created!");
      } 
      else {
        alert("Unable to create new user!");
      }
    }, 'json');
return false; 
};

$(function () {
  //home screen handler
  $('body').on('click','button',function(event){
    var id = event.target.id; 
    switch (id) {
    case 'all':
      $.getJSON('/users', all );     
      break;
    case 'new':
      $('.menu').hide();
      $('#newuser').show();
      $('#home').show();;      
      break; 
    case 'find':
      $('.menu').hide();
      $('#finduser').show();
      $('#home').show();;
      break;  
    case 'search':
      $('.menu').hide();
      $('#searchuser').show();
      $('#home').show();; 
      break;
    case 'update':
      $('.menu').hide();
      $('#updateuser').show();
      $('#home').show();;
      break;
    case 'delete':
      $('.menu').hide();
      $('#deleteuser').show();
      $('#home').show();;
      break;
    case 'submitnew':      
      form_submit();      
      break;
    case 'submitfind':
      find_submit();   
      break;
    case 'submitsearch':      
      search_submit();      
      break;      
    case 'submitupdate':      
      update_submit();      
      break;  
    case 'submitdelete':      
      delete_submit();      
      break;  
    case 'home':
      $('.secondary').hide();
      $('.menu').show();
      $('#listall').empty();     
      break;
    default:      
      break;
    }
  });
  //create user handler
  
});

 
