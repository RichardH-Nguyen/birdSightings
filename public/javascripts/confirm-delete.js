// search for all delete buttons and add click event
//click event gets the name attribute of the button and uses it on confirm message.

var deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(function(button){
   var name = button.getAttributeNode('name').value;

   button.addEventListener('click', function (e){
       var confirmDelete = confirm('Are you sure you want to delete ' + name + '?');

       if(!confirmDelete){  //if user hits cancel, event cancels
           event.preventDefault();
       }
   })
});