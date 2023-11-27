function validateAndSubmit() {
    // Implement validation logic
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let phone = document.getElementById("phone").value;
    let cep = document.getElementById("cep").value;

    // Assuming you have an array of products representing the items in the cart
    let products = [
        { name: "Product 1", price: 50, quantity: 2 },
        { name: "Product 2", price: 30, quantity: 1 },
        // Add other products as needed
    ];

    // Calculate totalSale based on the products in the cart
    let totalSale = products.reduce((total, product) => total + product.price * product.quantity, 0);

    // Retrieve previous total sales from localStorage
    let previousTotalSales = localStorage.getItem('totalSales');

    // If there are previous total sales, parse it as JSON; otherwise, initialize an empty array
    let totalSalesArray = previousTotalSales ? JSON.parse(previousTotalSales) : [];

    // Add the current totalSale to the array
    totalSalesArray.push(totalSale);

    // Store the updated total sales array in localStorage
    localStorage.setItem('totalSales', JSON.stringify(totalSalesArray));

    // Log the order details and totalSale to the console for now
    console.log("Order Details:", { name, email, cpf, phone, cep, products, totalSale });

    // Use CORS Anywhere to make a cross-origin request to the API
    fetch('https://cors-anywhere.herokuapp.com/https://app.headlessforms.cloud/api/v1/form-submission/WF0tuafB2d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, cpf, phone, cep, products, totalSale }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // You can handle success response here
    })
    .catch((error) => {
        console.error('Error:', error);
        // You can handle error here
    });

    // Use Email.js to send an email
    emailjs.send("default_service", "your_emailjs_template_id", {
        name: name,
        email: email,
        // Add other template variables as needed
    })
    .then(function(response) {
        console.log("Email sent successfully:", response);
    }, function(error) {
        console.log("Email failed to send:", error);
    });

    // You can also display a success message or redirect the user to a thank you page
}

function calculateTotalSales() {
    // Retrieve total sales array from localStorage
    let totalSalesArray = localStorage.getItem('totalSales');
   
    // If there are previous total sales, parse it as JSON; otherwise, initialize an empty array
    totalSalesArray = totalSalesArray ? JSON.parse(totalSalesArray) : [];

    // Calculate the total of all sales
    let totalSales = totalSalesArray.reduce((total, sale) => total + sale, 0);

    // Display the total on the page
    document.getElementById('totalSales').innerText = `Total de Vendas: ${totalSales}`;
}