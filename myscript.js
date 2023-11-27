function validateAndSubmit() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let phone = document.getElementById("phone").value;
    let cep = document.getElementById("cep").value;

    let products = [
        { name: "Product 1", price: 50, quantity: 2 },
        { name: "Product 2", price: 30, quantity: 1 },

    ];


    let totalSale = products.reduce((total, product) => total + product.price * product.quantity, 0);

    let previousTotalSales = localStorage.getItem('totalSales');


    let totalSalesArray = previousTotalSales ? JSON.parse(previousTotalSales) : [];

    totalSalesArray.push(totalSale);

    localStorage.setItem('totalSales', JSON.stringify(totalSalesArray));

    console.log("Order Details:", { name, email, cpf, phone, cep, products, totalSale });

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

    })
    .catch((error) => {
        console.error('Error:', error);

    });

    emailjs.send("default_service", "your_emailjs_template_id", {
        name: name,
        email: email,

    })
    .then(function(response) {
        console.log("Email sent successfully:", response);
    }, function(error) {
        console.log("Email failed to send:", error);
    });


}

function calculateTotalSales() {

    let totalSalesArray = localStorage.getItem('totalSales');
   

    totalSalesArray = totalSalesArray ? JSON.parse(totalSalesArray) : [];

    let totalSales = totalSalesArray.reduce((total, sale) => total + sale, 0);


    document.getElementById('totalSales').innerText = `Total de Vendas: ${totalSales}`;
}