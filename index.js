$(document).ready(function() {
    // Function to get menu items from API
    function getMenuItems() {
        $.get('http://localhost:3000/menuItems', function(menuItems) {
            $('#menuList').empty(); // Clear existing menu items
            menuItems.forEach(function(item) {
                $('#menuList').append(`<li class="list-group-item">${item.name} - $${item.price.toFixed(2)}</li>`);
            });
        });
    }

    // Call getMenuItems function on page load
    getMenuItems();

    // Submit form to add new menu item
    $('#menuItemForm').submit(function(event) {
        event.preventDefault();
        let itemName = $('#itemName').val();
        let itemPrice = parseFloat($('#itemPrice').val());
        if (itemName.trim() !== '' && !isNaN(itemPrice) && itemPrice > 0) {
            $.post('http://localhost:3000/menuItems', { name: itemName, price: itemPrice }, function() {
                $('#itemName').val(''); // Clear input fields after submission
                $('#itemPrice').val('');
                getMenuItems(); // Refresh menu items after adding new item
            });
        }
    });
});
