package com.example.tienda.dao;

import com.example.tienda.models.Productos;


import java.util.List;

public interface ProductoDao {
    List<Productos> ListaUsuarios();
    void Registrar(Productos productos);
    void Eliminar(Long id);
    List<Productos> buscarPorId(Long id);
}
