$(document).ready(function() {
    
    function fetchContacts() {
        $.ajax({
            url: 'https://mockapi.io/api/v1/contacts',
            method: 'GET',
            success: function(data) {
                $('#contactList').empty();
                data.forEach(function(contact) {
                    $('#contactList').append('<li class="list-group-item">' + contact.name + ' - ' + contact.email + ' <button class="btn btn-danger btn-sm float-right deleteBtn" data-id="' + contact.id + '">Delete</button></li>');
                });
            }
        });
    }
    
    fetchContacts();

    $('#contactForm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        $.ajax({
            url: 'https://mockapi.io/api/v1/contacts',
            method: 'POST',
            data: { name: name, email: email },
            success: function() {
                $('#name, #email').val('');
                fetchContacts();
            }
        });
    });
    
    $(document).on('click', '.deleteBtn', function() {
        var id = $(this).data('id');
        $.ajax({
            url: 'https://mockapi.io/api/v1/contacts/' + id,
            method: 'DELETE',
            success: function() {
                fetchContacts();
            }
        });
    });
});
