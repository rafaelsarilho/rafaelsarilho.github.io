document.addEventListener("DOMContentLoaded", function () {
    console.log("Tentando carregar a navbar...");

    fetch("navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            console.log("Navbar carregada com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao carregar a navbar:", error);
            document.getElementById("navbar-container").innerHTML = "<p>Erro ao carregar a barra de navegação.</p>";
        });
});
