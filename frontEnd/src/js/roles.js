document.getElementById('form_roles').addEventListener('submit', async (event) => {
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