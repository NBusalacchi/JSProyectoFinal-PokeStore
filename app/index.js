const pokeCart = document.getElementById("poke-cart");
const storeContainer = document.getElementById("store-container");
const pokeItemCart = document.getElementById("poke-item-cart");
const hiddenCart = document.getElementById("hidden-cart");
const closeCart = document.getElementById("close-cart");
const totalElement = document.getElementById("total");
const buyBtn = document.getElementById("buy-btn");
const deleteAll = document.getElementById("all-remove-btn");

// carrito + localstorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// total del precio

let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

// Función para actualizar el total del precio en el HTML y en el localStorage

const updateTotalPrice = () => {
    totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalElement.innerHTML = `Total: $${totalPrice}`;
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
};

// obtener los Pokémon

const fetchPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Ha surgido un error: " + response.statusText);
        }
        const data = await response.json();

        // Solicitar fetch de la PokeApi
        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return details;
        });

        const pokemons = await Promise.all(promises);

        // Crear cada artículo de la PokeStore
        pokemons.forEach((pokemon) => {
            // Hace que los nombres comiencen con mayúscula
            const MayuscFirstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();

            let typeImages = "";

            // Vincular las imágenes de los tipos con cada tipo respectivo de un pokemon
            pokemon.types.forEach((type) => {
                typeImages += `<img src="assets/types/${type.type.name}.png" alt="${type.type.name}" class="w-12 h-6 object-contain">`;
            });

            // Asignar el precio de cada artículo a partir de la suma de todas las estadísticas
            const totalBaseStat = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);

            // Crear el artículo
            const article = `
                             <article class="bg-white border-red-700 shadow-md rounded p-4 ">
                                 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-full h-64 object-contain mb-4">
                                 <h2 class="text-xl text-center font-bold mb-2 ">${MayuscFirstLetter}</h2>
                                 <div class="flex place-content-center ">${typeImages}</div>
                                 <div class="flex place-content-center mt-2 font-bold ">
                                      <p class="bg-red-700 rounded p-2 rounded-full text-white">$${totalBaseStat}</p>
                                 </div>
                                 <button class=" transition hover:-translate-y-1 hover:scale-110 delay-150 duration-200 bg-red-700 text-white text-bold px-4 py-2 hover:bg-blue-600 rounded add-btn" 
                                  data-name="${MayuscFirstLetter}" 
                                  data-img="${pokemon.sprites.front_default}"
                                  data-price="${totalBaseStat}">🛒</button>
                             </article>
                            `;

            storeContainer.innerHTML += article;
        });

        // Evento para el botón de agregado
        const addButtons = document.getElementsByClassName("add-btn");
        Array.from(addButtons).forEach((button) => {
            button.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const img = this.getAttribute("data-img");
                const price = parseInt(this.getAttribute("data-price"));
                addToCart(name, img, price);
            });
        });
    } catch (error) {
        console.error("Hubo un problema con el Fetch:", error);
    }
};

fetchPokemon();

// Evento para mostrar el carrito
pokeCart.addEventListener("click", function () {
    hiddenCart.classList.remove("hidden");
});

// Evento para cerrar el carrito
closeCart.addEventListener("click", function () {
    hiddenCart.classList.add("hidden");
});

// Función para eliminar del carrito
const removeFromCart = (name) => {
    // Buscar el índice del elemento en el array
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        // Elimina el elemento del array

        cart.splice(index, 1);

        // Actualiza el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Actualiza el total del precio
        updateTotalPrice();
    }
};

// Función para añadir al carrito
const addToCart = (name, img, price) => {
    // Constante para evitar que se repitan los pokemons
    const notRepeatPokemon = cart.some((x) => x.name === name);

    // Alerta de SweetAlert customizada
    if (notRepeatPokemon) {
        Swal.fire({
            title: "You already have this Pokémon!",
            width: 500,
            padding: "3em",
            color: "black",
            background: "#fff",
            backdrop: `
                rgba(0, 0, 0, 0.4)
                left top
                no-repeat
            `,
            confirmButtonColor: "#b91c1c",
            customClass: {
                popup: "custom-swal-popup",
            },
            didRender: () => {
                const swalPopup = document.querySelector(".custom-swal-popup");
                swalPopup.style.backgroundImage = "url(/assets/pikachu.png)";
                swalPopup.style.backgroundPosition = "120px center";
                swalPopup.style.backgroundRepeat = "no-repeat";
                swalPopup.style.backgroundSize = "50px 50px";
            },
        });
    } else {
        const listItem = document.createElement("li");

        // Crea los elementos del carrito
        listItem.classList.add("flex", "items-center", "mb-4");
        listItem.innerHTML = `
                              <button class="text-xl text-red-700 text-center font-bold remove-btn">x</button>
                              <img src="${img}" alt="${name}" class="w-24 h-24 object-contain ml-2">
                              <div class="flex flex-col items-start">
                                  <span class="text-xl font-bold">${name}</span>
                                  <span class="text-s ">$${price}</span>
                              </div>
                             `;

        // agrega al carrito visualmente

        pokeItemCart.appendChild(listItem);

        // agrega al carrito en el local

        cart.push({name, img, price});

        // auarda el carrito actualizado en localStorage

        localStorage.setItem("cart", JSON.stringify(cart));

        // agrega el evento de "eliminar" a los botones

        listItem.querySelector(".remove-btn").addEventListener("click", function () {
            removeFromCart(name, price);
            pokeItemCart.removeChild(listItem);
        });

        // actualiza el total del precio

        updateTotalPrice();

        // verificador de que se agregó al carro

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: "success",
            title: "Added to cart successfully",
        });
    }
};

// función para cargar el carrito desde el localStorage al iniciar la página

const loadCart = () => {
    // Limpia la lista antes de agregar elementos

    pokeItemCart.innerHTML = "";

    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("flex", "items-center", "mb-4");
        listItem.innerHTML = `
                              <button class="text-xl text-red-700 text-center font-bold remove-btn">x</button>
                              <img src="${item.img}" alt="${item.name}" class="w-24 h-24 object-contain ml-2">
                              <div class="flex flex flex-col items-start">
                                  <span class="text-xl font-bold">${item.name}</span>
                                  <span class="text-s ">$${item.price}</span>
                              </div>
                             `;

        // agrega el evento para "eliminar" a los botones

        listItem.querySelector(".remove-btn").addEventListener("click", function () {
            removeFromCart(item.name, item.price);
            pokeItemCart.removeChild(listItem);
        });

        pokeItemCart.appendChild(listItem);
    });

    // actualiza el total del precio

    updateTotalPrice();
};

//evento para comprar

buyBtn.addEventListener("click", function () {
    if (totalPrice === 0) {
        Swal.fire({
            icon: "error",
            title: "No Pokémon in the cart",
        });
    } else {
        // alerta del SweetAlert para la compra

        Swal.fire({
            title: "Enter your details",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Last Name">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email">',
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#b91c1c",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById("swal-input1").value;
                const lastName = document.getElementById("swal-input2").value;
                const email = document.getElementById("swal-input3").value;
                if (!name || !lastName || !email) {
                    Swal.showValidationMessage("Please complete all the information");
                }
                return {name: name, lastName: lastName, email: email};
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const name = result.value.name;
                const lastName = result.value.lastName;

                // alerta de SweetAlert para la compra

                Swal.fire({
                    title: `Thank you for purchasing, ${name} ${lastName},
                    your amount is $${totalPrice},see the progress of your delivery in your gmail!`,
                    confirmButtonColor: "#b91c1c",
                });

                // limpia el carrito después de la compra

                cart = [];

                localStorage.setItem("cart", JSON.stringify(cart));

                pokeItemCart.innerHTML = "";

                totalPrice = 0;

                total.innerHTML = `Total: $${totalPrice}`;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // se cancela la operacion
            }
        });
    }
});

// evento para eliminar todo de un solo click en el carro

deleteAll.addEventListener("click", function () {
    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    pokeItemCart.innerHTML = "";

    totalPrice = 0;

    total.innerHTML = `Total: $${totalPrice}`;
});

// inicia el carrito al cargar la página

loadCart();
