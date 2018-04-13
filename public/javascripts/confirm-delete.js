var deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(function(button){
   var name = button.getAttributeNode('name').value;

   button.addEventListener('click', function (e){
       var confirmDelete = confirm('Are you sure you want to delete ' + name + '?');

       if(!confirmDelete){
           event.preventDefault();
       }
   })
});