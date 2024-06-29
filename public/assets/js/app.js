document.addEventListener('DOMContentLoaded', () => {
    // Maneja el formulario de inicio de sesión
    const handleLoginForm = () => {
        const formLogin = document.getElementById('formLogin'); // Obtiene el formulario de inicio de sesión por su ID
        if (formLogin) {
            formLogin.addEventListener('submit', (e) => {
                const email = document.querySelector('input[name="email"]').value; // Obtiene el valor del campo email
                const password = document.querySelector('input[name="password"]').value; // Obtiene el valor del campo password
                const alerta = document.getElementById('alerta'); // Obtiene el elemento de alerta por su ID

                // Verifica si los campos email y password están vacíos
                if (!email.trim() || !password.trim()) {
                    e.preventDefault(); // Previene el envío del formulario
                    if (alerta) {
                        alerta.classList.remove('d-none'); // Muestra la alerta
                    }
                } else {
                    if (alerta) {
                        alerta.classList.add('d-none'); // Oculta la alerta
                    }
                }
            });
        }
    };

    // Configura las imágenes de los skaters en la tabla
    const imgSkaters = () => {
        document.querySelectorAll('tr[data-id]').forEach(tr => {
            const id = tr.getAttribute('data-id'); // Obtiene el ID del skater
            const nombre = tr.getAttribute('data-nombre'); // Obtiene el nombre del skater

            const div = tr.querySelector('td div');
            if (div) {
                div.style.backgroundImage = `url('../assets/img/${nombre}.jpg')`; // Establece la imagen de fondo del div
            }

            // Crea una regla CSS para el estilo del nth-child
            const nthChildStyle = document.createElement('style');
            nthChildStyle.textContent = `tbody tr:nth-child(${id}) td div {background-image: url('../assets/img/${nombre}.jpg')}`;
            document.head.appendChild(nthChildStyle); // Añade la regla CSS al head del documento
        });
    };

    // Actualiza la información del skater
    const actualizarSkater = () => {
        const btnPrimary = document.querySelector('.btn-primary'); // Obtiene el botón de actualización por su clase
        if (btnPrimary) {
            btnPrimary.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    // Obtiene los valores de los campos del formulario
                    const email = document.querySelector('input[name="email"]').value;
                    const nombre = document.querySelector('input[name="nombre"]').value;
                    const password = document.querySelector('input[name="password"]').value;
                    const password2 = document.querySelector('input[name="password2"]').value;
                    const experiencia = document.querySelector('input[name="experiencia"]').value;
                    const especialidad = document.querySelector('input[name="especialidad"]').value;

                    // Envía una solicitud PUT al servidor para actualizar el skater
                    await axios.put('/update', {
                        email,
                        nombre,
                        password,
                        password2,
                        experiencia,
                        especialidad
                    });

                    alert('Datos actualizados correctamente');
                } catch (error) {
                    console.error(error);
                    alert('Error, datos no actualizados: ' + error.message);
                }
            });
        }
    };

    // Elimina la cuenta del skater
    const deleteSkater = () => {
        const btnDanger = document.querySelector('.btn-danger'); // Obtiene el botón de eliminación por su clase
        if (btnDanger) {
            btnDanger.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const email = document.querySelector('input[name="email"]').value; // Obtiene el valor del campo email
                    await axios.delete(`/delete?email=${email}`); // Envía una solicitud DELETE al servidor para eliminar el skater
                    alert('Cuenta eliminada correctamente');
                    window.location.href = '/'; // Redirige a la página principal
                } catch (error) {
                    console.error(error);
                    alert('No se pudo eliminar la cuenta. Error: ' + error.message);
                }
            });
        }
    };

    // Maneja el formulario de registro
    const formListen = () => {
        const formRegistro = document.getElementById('formRegistro'); // Obtiene el formulario de registro por su ID
        if (formRegistro) {
            formRegistro.addEventListener('submit', async () => {
                try {
                    alert(`
                        Usuario registrado correctamente                        
                        `); // Muestra un mensaje de éxito
                    window.location.href = '/'; // Redirige a la página principal
                } catch (error) {
                    console.error(error);
                    alert('Error, no se pudo registrar: ' + error.message);
                }
            });
        }
    };

    // Inicializa todas las funciones al cargar el DOM
    handleLoginForm();
    imgSkaters();
    actualizarSkater();
    deleteSkater();
    formListen();
});
