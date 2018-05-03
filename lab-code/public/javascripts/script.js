$(document).ready(function(){


  $('#fetch-all').click(function(){
    //this route equates to http://localhost:300/api/characters
    axios.get('/api/characters')
    .then((responseFromApi)=>{
      $('.characters-container').empty(); //clear out the old data before appending new data
      responseFromApi.data.forEach((eachCharacter)=>{
  
        $('.characters-container').append(`
  
            <div class="character-info">
            <div class="name">Name: ${eachCharacter.name}</div>
            <div class="occupation">Occupation: ${eachCharacter.occupation}</div>
            <div class="weapon">Weapon: ${eachCharacter.weapon}</div>
            <div class="cartoon">Cartoon: ${eachCharacter.cartoon}</div>
            <div class="">Id: ${eachCharacter._id}</div>

          </div>
  
          `)
      }); //end forEach
    })
    .catch((err) => {
      console.log(err);
    });
  }); //end fetch all click function
  
$('#fetch-one').click(function(){
  const theID = $('.character-id').val();
  if(!theID){ 
    console.log("must enter ID for that to work")
    
    return }

  axios.get(`/api/characters/${theID}`)
  .then((res) => {

    $('.characters-container').empty();

    $('.characters-container').append(`
  
    <div class="character-info">
    <div class="name"> Name: ${res.data.name}</div>
    <div class="occupation"> Occupation: ${res.data.occupation}</div>
    <div class="weapon"> Weapon: ${res.data.weapon}</div>
    <div class="theID"> ID: ${res.data._id}</div>

  `)
     console.log(res.data);
     

  });
  
  
}); // end fetch-one click function

// .catch((err) => {
//   console.log(err);
// });


$('#new-character-form').submit(function(event) {
  event.preventDefault();
  const charInfo = {};
  charInfo.theName = $('.new-name').val();
  charInfo.theOccupation = $('.new-occupation').val();
  charInfo.theWeapon = $('.new-weapon').val();


  if($('.new-cartoon').is(':checked')) {
    charInfo.theCartoon = true;
  } else {
    charInfo.theCartoon = false;
  }

  axios.post('/api/characters/create', charInfo)
  .then((response)=> {
    $('#fetch-all').click();
    console.log("success", response)
  })
  .catch((err) => {
    console.log(err)
  })

  $('.new-name').val();
  $('.new-occupation').val();
  $('.new-weapon').val();
  $('.new-cartoon').prop('checked', false);
  

});

$("#edit-character-form").submit(function(e) {
  e.preventDefault();
  const id = $('.edit-chr-id').val();
  console.log(id);
  const editCharInfo = {};
  editCharInfo.name = $(".edit-name").val()
  editCharInfo.occupation = $ (".edit-occupation").val();
  editCharInfo.weapon = $ (".edit-occupation").val();


  if($('.eidt-cartoon').is(':checked')) {
    editCharInfo.cartoon = true;
  } else {
    editCharInfo.cartoon = false;
  }
  
  console.log(editCharInfo);

  axios.post(`/api/characters/update/${id}`, editCharInfo)
  .then((res) => {
    console.log("success", res)
    $('.character-id').val(id);
    $('#fetch-one').click();
    $('input').val("");
  })
  .catch((err) => {
    console.log(err)
  })

  $('input').val("");
  // $('.edit-name').val();
  // $('.edit-occupation').val();
  // $('.edit-weapon').val();
  $('.edit-cartoon').prop('checked', false);
  // $('.edit-chr-id').val("");

  

})


});