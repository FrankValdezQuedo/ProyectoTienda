package com.example.tienda.dao;

import com.example.tienda.models.Productos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ProductoDaoImpl implements ProductoDao{

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Productos> ListaUsuarios() {
        String query = "FROM Productos";
        List<Productos> productos = entityManager.createQuery(query, Productos.class).getResultList();
        return productos;
    }

    @Override
    public void Registrar(Productos productos) {
        entityManager.merge(productos);
    }

    @Override
    public void Eliminar(Long id) {
        Productos productos = entityManager.find(Productos.class,id);
        entityManager.remove(productos);
    }
    @Override
    public List<Productos> buscarPorId(Long id) {
        String query = "SELECT p FROM Productos p WHERE p.id = :id";
        List<Productos> producto = entityManager.createQuery(query, Productos.class)
                .setParameter("id", id)
                .getResultList();
        return producto;
    }
}
