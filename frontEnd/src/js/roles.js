const formRoles = document.getElementById('form_roles');
const userList = document.getElementById('user_list');
const btnEditUser = document.getElementById('btn_edit_user');
const editUserModal = document.getElementById('editUserModal');
const cancelEdit = document.getElementById('cancel_edit');
const editUserForm = document.getElementById('edit_user_form');
const editUserId = document.getElementById('edit_user_id');
const editUserEmail = document.getElementById('edit_user_email');
const editUserName = document.getElementById('edit_user_name');
const editUserRole = document.getElementById('edit_user_role');

formRoles.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const userRole = document.getElementById('user_role').value;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}/rol`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rol: userRole }),
        });

        if (response.ok) {
            alert('Rol actualizado correctamente');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        alert('Error al actualizar el rol');
    }
});

let userSelected = {};

// Función para cargar los correos electrónicos de los usuarios
async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/sanitaria/usuarios');
        console.log(response);
        if (response.ok) {
            const usuarios = await response.json();
            userList.innerHTML = ''; 
                usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id;
                option.textContent = usuario.email_usu;
                option.style.color = 'black';
                userList.appendChild(option);
            });
        } else {
            console.error('Error al cargar los usuarios');
        }
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
}

// Llamar a la función para cargar los usuarios al enfocar el select
userList.addEventListener('focus', cargarUsuarios);

// Mostrar el modal de edición de usuario
btnEditUser.addEventListener('click', async () => {
    const userId = userList.value;
    if (!userId) {
        alert('Selecciona un usuario primero');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`);
        if (response.ok) {
            const usuario = await response.json();
            editUserId.value = usuario.id;
            editUserEmail.value = usuario.email;
            editUserName.value = usuario.nombre;
            editUserRole.value = usuario.rol;
            editUserModal.classList.remove('hidden');
        } else {
            console.error('Error al cargar los datos del usuario');
        }
    } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
    }
});

// Ocultar el modal de edición de usuario
cancelEdit.addEventListener('click', () => {
    editUserModal.classList.add('hidden');
});

// Guardar los cambios del usuario editado
editUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = editUserId.value;
    const userEmail = editUserEmail.value;
    const userName = editUserName.value;
    const userRole = editUserRole.value;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail, nombre: userName, rol: userRole }),
        });

        if (response.ok) {
            alert('Usuario actualizado correctamente');
            editUserModal.classList.add('hidden');
            cargarUsuarios(); // Recargar la lista de usuarios
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
    }
});