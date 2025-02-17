const userList = document.getElementById('user_list');
const btnEditUser = document.getElementById('btn_edit_user');
const btnDeleteUser = document.getElementById('btn_delete_user');
const btnDeleteAllCassettes = document.getElementById('btn_delete_all_cassettes');
const btnDeleteAllSamples = document.getElementById('btn_delete_all_samples');
const btnDeleteAllImages = document.getElementById('btn_delete_all_images');
const editUserModal = document.getElementById('editUserModal');
const cancelEdit = document.getElementById('cancel_edit');
const editUserForm = document.getElementById('edit_user_form');
const editUserId = document.getElementById('edit_user_id');
const editUserEmail = document.getElementById('edit_user_email');
const editUserName = document.getElementById('edit_user_name');
const editUserSurname = document.getElementById('edit_user_apellidos');
const editUserCenter = document.getElementById('edit_user_centro');
const editUserRole = document.getElementById('edit_user_role');

// Cargar usuarios en el select
const cargarUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:3000/sanitaria/usuarios');
        if (!response.ok) throw new Error('Error al cargar los usuarios');
        
        const usuarios = await response.json();
        userList.innerHTML = '<option value="" disabled selected>Seleccionar Usuario</option>';
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id_usu;
            option.textContent = usuario.email_usu;
            userList.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
};

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
        if (!response.ok) throw new Error('Error al cargar los datos del usuario');
        
        const usuario = await response.json();
        editUserId.value = usuario.id_usu;
        editUserEmail.value = usuario.email_usu;
        editUserName.value = usuario.nombre_usu;
        editUserSurname.value = usuario.apellidos_usu;
        editUserCenter.value = usuario.centro_usu;
        editUserRole.value = usuario.rol;
        
        // Bloquear el cambio de rol si es admin
        editUserRole.disabled = usuario.rol === 'A';
        editUserModal.classList.remove('hidden');
    } catch (error) {
        console.error(error);
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
    const userSurname = editUserSurname.value;
    const userCenter = editUserCenter.value;
    const userRole = editUserRole.value;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_usu: userEmail, nombre_usu: userName, apellidos_usu: userSurname, centro_usu: userCenter, rol: userRole })
        });
        
        if (!response.ok) throw new Error('Error al actualizar el usuario');
        
        alert('Usuario actualizado correctamente');
        editUserModal.classList.add('hidden');
        cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
        console.error(error);
    }
});
// Eliminar usuario con confirmación
btnDeleteUser.addEventListener('click', async () => {
    const userId = userList.value;
    if (!userId) {
        alert('Selecciona un usuario primero');
        return;
    }

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar el usuario');

        alert('Usuario eliminado correctamente');
        cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
        console.error(error);
    }
});

// Eliminar todos los cassettes con confirmación
btnDeleteAllCassettes.addEventListener('click', async () => {
    const confirmDelete = confirm('¿Seguro que quieres eliminar todos los cassettes? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
        const response = await fetch('http://localhost:3000/sanitaria/cassettes', {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar todos los cassettes');

        alert('Todos los cassettes eliminados correctamente');
    } catch (error) {
        console.error(error);
    }
});

// Eliminar todas las muestras con confirmación
btnDeleteAllSamples.addEventListener('click', async () => {
    const confirmDelete = confirm('¿Seguro que quieres eliminar todas las muestras? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
        const response = await fetch('http://localhost:3000/sanitaria/muestras', {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar todas las muestras');

        alert('Todas las muestras eliminadas correctamente');
    } catch (error) {
        console.error(error);
    }
});

// Eliminar todas las imágenes con confirmación
btnDeleteAllImages.addEventListener('click', async () => {
    const confirmDelete = confirm('¿Seguro que quieres eliminar todas las imágenes? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
        const response = await fetch('http://localhost:3000/sanitaria/imagenes', {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar todas las imágenes');

        alert('Todas las imágenes eliminadas correctamente');
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    userList.addEventListener('focus', cargarUsuarios);
});