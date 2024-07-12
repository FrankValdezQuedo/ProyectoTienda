package com.example.tienda.dao;

import com.example.tienda.models.Usuarios;

import java.util.List;

public interface UsuarioDao {
    List<Usuarios> ListaUsuarios();
    void Registrar(Usuarios usuarios);

    void Eliminar(Long id);
}
