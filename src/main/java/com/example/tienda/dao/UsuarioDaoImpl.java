package com.example.tienda.dao;

import com.example.tienda.models.Usuarios;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class UsuarioDaoImpl implements UsuarioDao{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    @Transactional
    public List<Usuarios> ListaUsuarios() {
        // Se construye la consulta para obtener todos los registros de la tabla Usuarios
        String query = "FROM Usuarios";
        // Se ejecuta la consulta usando el EntityManager para obtener una lista de Usuarios
        List<Usuarios> usuarios = entityManager.createQuery(query, Usuarios.class).getResultList();
        // Se devuelve la lista de usuarios obtenida de la base de datos
        return usuarios;
    }

    @Override
    public void Registrar(Usuarios usuarios) {
        entityManager.merge(usuarios);
    }

    @Override
    public void Eliminar(Long id) {
        Usuarios usuarios = entityManager.find(Usuarios.class,id);
        entityManager.remove(usuarios);
    }
}
