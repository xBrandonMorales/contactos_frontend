function getAll() {
    var request = new XMLHttpRequest();

    request.onerror = function () {
        console.error("Error al realizar la solicitud.");
    };

    request.open('GET', "https://8080-xbrandonmor-contactosba-865ied0q764.ws-us106.gitpod.io", true);
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            try {
                const response = request.responseText;
                const json = JSON.parse(response);

                const tbody_contactos = document.getElementById("tbody_contactos");

                // Limpiar cualquier contenido previo en la tabla
                tbody_contactos.innerHTML = "";

                json.forEach((contact) => {
                    var tr = document.createElement("tr");
                    var td_email = document.createElement("td");
                    var td_nombre = document.createElement("td");
                    var td_telefono = document.createElement("td");
                    var td_options = document.createElement("td");

                    td_email.textContent = contact["email"];
                    td_nombre.textContent = contact["nombre"];
                    td_telefono.textContent = contact["telefono"];

                    // Crear botón "Ver" para cada registro
                    var viewButton = document.createElement("button");
                    viewButton.textContent = "Ver";
                    viewButton.addEventListener("click", function () {
                        // Redirige a la página "ver.html" con el correo electrónico como parámetro
                        window.location.href = `ver?email=${contact["email"]}`;
                    });

                    // Crear botón "Editar" para cada registro
                    var editButton = document.createElement("button");
                    editButton.textContent = "Editar";
                    editButton.addEventListener("click", function () {
                        // Redirige a la página "editar.html" con el correo electrónico como parámetro
                        window.location.href = `editar?email=${contact["email"]}`;
                    });

                    // Crear botón "Borrar" para cada registro
                    var deleteButton = document.createElement("button");
                    deleteButton.textContent = "Borrar";
                    deleteButton.addEventListener("click", function () {
                        // Redirige a la página "borrar.html" con el correo electrónico como parámetro
                        window.location.href = `borrar?email=${contact["email"]}`;
                    });

                    // Agregar los botones a la celda de opciones
                    td_options.appendChild(viewButton);
                    td_options.appendChild(editButton);
                    td_options.appendChild(deleteButton);

                    tr.appendChild(td_email);
                    tr.appendChild(td_nombre);
                    tr.appendChild(td_telefono);
                    tr.appendChild(td_options);

                    tbody_contactos.appendChild(tr);
                });

            } catch (error) {
                console.error("Error al procesar la respuesta:", error);
            }
        } else {
            console.error("Error en la solicitud. Código de estado:", request.status);
        }
    };
}
