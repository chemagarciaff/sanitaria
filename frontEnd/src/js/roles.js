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
const messageModal = document.getElementById('messageModal');
const messageModalContent = document.getElementById('messageModalContent');
const messageText = document.getElementById('messageText');
const closeMessageModal = document.getElementById('closeMessageModal');
const confirmModal = document.getElementById('confirmModal');
const confirmModalContent = document.getElementById('confirmModalContent');
const confirmText = document.getElementById('confirmText');
const confirmCancel = document.getElementById('confirmCancel');
const confirmOk = document.getElementById('confirmOk');


// Mostrar el modal de mensajes
const showMessageModal = (message, type) => {
    messageText.textContent = message;
    messageModalContent.classList.remove('border-teal-300', 'border-red-400', 'border-green-400');
    if (type === 'info') {
        messageModalContent.classList.add('border-teal-300');
    } else if (type === 'error') {
        messageModalContent.classList.add('border-red-400');
    } else if (type === 'success') {
        messageModalContent.classList.add('border-green-400');
    }
    messageModal.classList.remove('hidden');
};

// Ocultar el modal de mensajes
const hideMessageModal = () => {
    messageModal.classList.add('hidden');
};

closeMessageModal.addEventListener('click', hideMessageModal);

// Mostrar modal de confirmación
const showConfirmModal = (message, type, callback) => {
    confirmText.textContent = message;
    confirmModalContent.classList.remove('border-teal-300', 'border-red-400', 'border-green-400');
    if (type === 'info') {
        confirmModalContent.classList.add('border-teal-300');
    } else if (type === 'error') {
        confirmModalContent.classList.add('border-red-400');
    } else if (type === 'success') {
        confirmModalContent.classList.add('border-green-400');
    }
    confirmModal.classList.remove('hidden');

    confirmOk.onclick = () => {
        callback();
        confirmModal.classList.add('hidden');
    };

    confirmCancel.onclick = () => {
        confirmModal.classList.add('hidden');
    };
};

// Cargar los usuarios en el select
const cargarUsuarios = async () => {
    const token = getAuthToken();//guarda el token en la variable
    if (!token) return;//comprueba que existe el token
    try {
        const response = await fetch('http://localhost:3000/sanitaria/usuarios',{
            headers: {//paso por la cabecera de petición
                'Content-Type': 'application/json',
                'user-token': token
            }
        });
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
        showMessageModal('Error al cargar los usuarios', 'error');
    }
};

// Llamar a la función para cargar los usuarios al enfocar el select
userList.addEventListener('focus', cargarUsuarios);

// Mostrar el modal de edición de usuario
btnEditUser.addEventListener('click', async () => {
    const token = getAuthToken();
    if (!token) return;
    const userId = userList.value;
    if (!userId) {
        showMessageModal('Selecciona un usuario primero', 'info');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': token
                }
            });

        if (!response.ok) throw new Error('Error al cargar los datos del usuario');
        
        const usuario = await response.json();
        editUserId.value = usuario.id_usu;
        editUserEmail.value = usuario.email_usu;
        editUserName.value = usuario.nombre_usu;
        editUserSurname.value = usuario.apellidos_usu;
        editUserCenter.value = usuario.centro_usu;
        editUserRole.value = usuario.rol;
        
        // Evitar cambio de rol si ya es admin
        editUserRole.disabled = usuario.rol === 'A';
        editUserModal.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        showMessageModal('Error al cargar los datos del usuario', 'error');
    }
});

// Ocultar el modal de edición de usuario
cancelEdit.addEventListener('click', () => {
    editUserModal.classList.add('hidden');
});

// Guardar los cambios del usuario editado
editUserForm.addEventListener('submit', async (event) => {
    const token = getAuthToken();
    if (!token) return;
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
            headers: { 'Content-Type': 'application/json',
                        'user-token': token,
            },
            body: JSON.stringify({ email_usu: userEmail, nombre_usu: userName, apellidos_usu: userSurname, centro_usu: userCenter, rol: userRole })
        });
        if (!response.ok) throw new Error('Error al actualizar el usuario');
        showMessageModal('Usuario actualizado correctamente', 'success');
        editUserModal.classList.add('hidden');
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        showMessageModal('Error al actualizar el usuario', 'error');
    }
});

// Eliminar un usuario confirmando antes
btnDeleteUser.addEventListener('click', async () => {
    const token = getAuthToken();
    if (!token) return;
    const userId = userList.value;
    if (!userId) {
        showMessageModal('Selecciona un usuario primero', 'info');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`,{
            headers: {'Content-Type': 'application/json',
                        'user-token': token,
                    }
        });
        if (!response.ok) throw new Error('Error al cargar los datos del usuario');
        
        const usuario = await response.json();
        if (usuario.rol === 'A') {
            showMessageModal('No se puede eliminar un usuario con rol de administrador', 'error');
            return;
        }

        showConfirmModal('¿Estás seguro de que deseas eliminar este usuario? Esta acción no es reversible.', 'error', async () => {
            try {
                const response = await fetch(`http://localhost:3000/sanitaria/usuarios/${userId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                            'user-token': token,
                    }
                });

                if (!response.ok) throw new Error('Error al eliminar el usuario');

                showMessageModal('Usuario eliminado correctamente', 'success');
                cargarUsuarios();
            } catch (error) {
                console.error(error);
                showMessageModal('Error al eliminar el usuario', 'error');
            }
        });
    } catch (error) {
        console.error(error);
        showMessageModal('Error al cargar los datos del usuario', 'error');
    }
});

// Eliminar todos los cassettes confirmando antes
btnDeleteAllCassettes.addEventListener('click', () => {
    const token = getAuthToken();
    if (!token) return;
    showConfirmModal('¿Seguro que quieres eliminar todos los cassettes? Esta acción no se puede deshacer.', 'error', async () => {
        try {
            const response = await fetch('http://localhost:3000/sanitaria/cassettes', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                            'user-token': token,
                }
            });
            if (!response.ok) throw new Error('Error al eliminar todos los cassettes');
            showMessageModal('Todos los cassettes eliminados correctamente', 'success');
        } catch (error) {
            console.error(error);
            showMessageModal('Error al eliminar todos los cassettes', 'error');
        }
    });
});

// Eliminar todas las muestras confirmando antes
btnDeleteAllSamples.addEventListener('click', () => {
    const token = getAuthToken();
    if (!token) return;
    showConfirmModal('¿Seguro que quieres eliminar todas las muestras? Esta acción no se puede deshacer.', 'error', async () => {
        try {
            const response = await fetch('http://localhost:3000/sanitaria/muestras', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                            'user-token': token,
                }
            });
            if (!response.ok) throw new Error('Error al eliminar todas las muestras');
            showMessageModal('Todas las muestras eliminadas correctamente', 'success');
        } catch (error) {
            console.error(error);
            showMessageModal('Error al eliminar todas las muestras', 'error');
        }
    });
});

// Eliminar todas las imágenes confirmando antes
btnDeleteAllImages.addEventListener('click', () => {
    const token = getAuthToken();
    if (!token) return;
    showConfirmModal('¿Seguro que quieres eliminar todas las imágenes? Esta acción no se puede deshacer.', 'error', async () => {
        try {
            const response = await fetch('http://localhost:3000/sanitaria/imagenes', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                            'user-token': token,
                }
            });
            if (!response.ok) throw new Error('Error al eliminar todas las imágenes');
            showMessageModal('Todas las imágenes eliminadas correctamente', 'success');
        } catch (error) {
            console.error(error);
            showMessageModal('Error al eliminar todas las imágenes', 'error');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    getAuthToken();
    userList.addEventListener('focus', cargarUsuarios);
});
