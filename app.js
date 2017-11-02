
'use strict' ;

$(document).ready(function() {
             
/**********************
 Global Variables
***********************/

let image, fullName, email, city, username, fullWrapper, modal, telephone, address, birthday, country, fullModal, card;

// Whenever called, the employee object holds all data from every user.

function employeeDetail(url, fullName, dob, user, place, homeland, mail, cell, home) {
   this.image = url;
   this.fullName = fullName;
   this.birthday = dob;
   this.username = user;
   this.city = place;
   this.country = homeland; 
   this.email = mail;  
   this.telephone = cell;  
   this.address = home;
   } 

 
//All employees objects are stored in the array.

let employeesDetailsArray = [];

const modalInfo = $('.modal-title');


 //The first letter of the name is converted to capitalLetter. 

function capitalLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    

 /***************************
       AJAX REQUEST
  **************************/

//An ajax request is made to get all employeesData in json format

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us,de,dk,es',
  dataType: 'json',
  success: function(data) {
    let employeesData = data.results;
   

//Each employeesData is saved in proper format.

    $.each(employeesData, function (index, value) {
      fullName = capitalLetter(employeesData[index].name.first) + ' ' + capitalLetter(employeesData[index].name.last);
      email = employeesData[index].email;
      city = capitalLetter(employeesData[index].location.city);
      country = employeesData[index].nat;
      username = employeesData[index].login.username; 
      image = employeesData[index].picture.large; //As thumbnail employee image appears blur, so it has been replaced with large image. 
      telephone = employeesData[index].cell;
      address = employeesData[index].location.street + ' ' + city + ' ' + employeesData[index].location.state + ', ' + country + employeesData[index].location.postcode;
      birthday = employeesData[index].dob;

//An employeeDetail object is created in each loop using all the necessary variables to save all the values.

      employeesDetailsArray.push(new employeeDetail(image, fullName, birthday, username, city, country, email, telephone, address));

        card = document.getElementsByClassName('employeeHtml');
        
    })

//Data is filled in each employee card.
    const cardEmployeeName = document.getElementsByClassName('name');
    const cardEmployeeEmail = document.getElementsByClassName('email');
    const cardEmployeeCity= document.getElementsByClassName('city');
    const cardEmployeeImage = document.getElementsByClassName('image');
    const modalHtml = document.getElementsByClassName('modalHtml');
    const modalSetup = document.getElementsByClassName('modal');

    //for loop for cards
   for (let i = 0; i < employeesDetailsArray.length; i++) {
      if (employeesDetailsArray[i].fullName.length > 12)  {
        cardEmployeeName[i].textContent = employeesDetailsArray[i].fullName; 
        cardEmployeeName[i].className += ' name-small';
      } else {
        cardEmployeeName[i].textContent = employeesDetailsArray[i].fullName;
      }
      
      if (employeesDetailsArray[i].email.length > 16) {
        cardEmployeeEmail[i].textContent = employeesDetailsArray[i].email;
        cardEmployeeEmail[i].className += ' email-small';
      } else {
        cardEmployeeEmail[i].textContent = employeesDetailsArray[i].email;
      }
       
      if (employeesDetailsArray[i].city.length > 12) {
        cardEmployeeCity[i].textContent = `${employeesDetailsArray[i].city}, ${employeesDetailsArray[i].country}`;
        cardEmployeeCity[i].className += ' city-small'
      } else if (city.length > 18) {
        cardEmployeeCity[i].textContent = `${employeesDetailsArray[i].city}, ${employeesDetailsArray[i].country}`;
        cardEmployeeCity[i].className += ' city-super-small'
      } else {
        cardEmployeeCity[i].textContent = `${employeesDetailsArray[i].city}, ${employeesDetailsArray[i].country}`;
      } 


    cardEmployeeImage[i].src = employeesDetailsArray[i].image;
    }//for loop for cards ends.

     
    
    const goBack = document.getElementById('leftButton');
    const goNext = document.getElementById('rightButton');
      
      let testName, testNameMatch, counter;
    
        /**************************
          Event Listeners
        ************************/
    
    for (let i=0; i < employeesDetailsArray.length; i++) {
                                 
        card[i].addEventListener('click', () => {
           
        $(document).ready( function () {
    $("#myModal").modal("show").on('shown.bs.modal', function () {
        $(".modal").css('display', 'block');
    })
    });         
        

        testName = employeesDetailsArray[i].fullName; 
         
         //DISPLAY MODAL EMPLOYEE INFORMATION: picture, name, username, email, cell, full address, birthdate
            
        const innerModal = document.getElementById('pasteDataHere');
         
           let modalData =  `<div class="modal-body">
              <img src="${employeesDetailsArray[i].image}" width="190" height="190" class="img-circle"> 
              <h3 class="modal-title"><b><span class="nameSpan">${employeesDetailsArray[i].fullName}</span></b></h3>
              <p class="modal-title"><span class="usernameSpan">${employeesDetailsArray[i].username}</span></p>
              <p class="modal-title"><span class="emailSpan">${employeesDetailsArray[i].email}</span></p><hr>
              <p class="modal-title"><span class="cellSpan"></span>${employeesDetailsArray[i].telephone}</p>
              <p class="modal-title"><span class="addressSpan">${employeesDetailsArray[i].address}</span></p>                
              <p class="modal-title">Birthday : <span class="birthdaySpan">${employeesDetailsArray[i].birthday}</span></p>
            </div>`   
                            
            console.log(innerModal);     
            innerModal.innerHTML = modalData;

            })
   }

       //Click on the previous button to display modalInfo of previous employee
     
      goBack.addEventListener('click', () => {
        for (let i = 0; i < employeesDetailsArray.length; i ++) {
          
          let testNameMatch = employeesDetailsArray[i].fullName;

                                                 
          const innerModal = document.getElementById('pasteDataHere');
          if (testName == testNameMatch) {
            
            let modalData = `<div class="modal-body">
              <img src="${employeesDetailsArray[i-1].image}" width="190" height="190" class="img-circle">
              <h3 class="modal-title"><b>Full Name : </b><span class="nameSpan">${employeesDetailsArray[i-1].fullName}</span></h3>
              <p class="modal-title"><span class="usernameSpan">${employeesDetailsArray[i-1].username}</span></p>
              <p class="modal-title"><span class="emailSpan">${employeesDetailsArray[i-1].email}</span></p><hr>                         
              <p class="modal-title"><span class="cellSpan"></span>${employeesDetailsArray[i-1].telephone}</p>
              <p class="modal-title"><span class="addressSpan">${employeesDetailsArray[i-1].address}</span></p>
              <p class="modal-title">Birthday : <span class="birthdaySpan">${employeesDetailsArray[i-1].birthday}</span></p>
            </div>`
            innerModal.innerHTML = modalData;
            counter = i - 1;
          }
        } 
        testName = employeesDetailsArray[counter].fullName;
      })

     //Click of the next button to show the modal of next employee

    goNext.addEventListener('click', () => {
        for (let i = 0; i < employeesDetailsArray.length; i ++) {
          let testNameMatch = employeesDetailsArray[i].fullName;          
          
          const innerModal = document.getElementById('pasteDataHere');
          if (testName == testNameMatch) {
            
            let modalData = `<div class="modal-body">
              <img src="${employeesDetailsArray[i+1].image}" width="190" height="190" class="img-circle">
              <h3 class="modal-title"><b>Full Name : </b><span class="nameSpan">${employeesDetailsArray[i+1].fullName}</span></h3>
              <p class="modal-title"><span class="usernameSpan">${employeesDetailsArray[i+1].username}</span></p>
              <p class="modal-title"><span class="emailSpan">${employeesDetailsArray[i+1].email}</span></p><hr>                           
              <p class="modal-title"><span class="cellSpan"></span>${employeesDetailsArray[i+1].telephone}</p>
              <p class="modal-title"><span class="addressSpan">${employeesDetailsArray[i+1].address}</span></p>
              <p class="modal-title">Birthday : <span class="birthdaySpan">${employeesDetailsArray[i+1].birthday}</span></p>
            </div>`
            innerModal.innerHTML = modalData;
            counter = i + 1;
          }
        } 
        testName = employeesDetailsArray[counter].fullName; 
      })

  }
}); //Ajax Request is completed.

/**********************************************************
SEARCH for matching employee using name or username.
************************************************************/

//Vars necessary for search function are created

const search = document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {
  let nameSearch = searchInput.value.toLowerCase(); 
  
    for (let i = 0; i < employeesDetailsArray.length; i++) {
      card[i].style.display = 'none';
    }

  //Only results meeting filter requirement are shown 

   for (let i = 0; i < employeesDetailsArray.length; i++) {
      console.log(nameSearch);
      let testName = employeesDetailsArray[i].fullName.toLowerCase();
       testName = testName.indexOf(nameSearch);
      let testUsername = employeesDetailsArray[i].username.indexOf(nameSearch);
      if (testName >= 0 || testUsername >= 0) {
        card[i].style.display = '';
      } 
    }
});
});
