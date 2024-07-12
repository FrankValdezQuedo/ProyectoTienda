package com.example.tienda.controllers;

import com.example.tienda.dao.UsuarioDao;
import com.example.tienda.models.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {
    @Autowired
    UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuarios> ListarUsuarios() {
        return usuarioDao.ListaUsuarios();
    }

    @RequestMapping(value = "api/registrar", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuarios usuarios) {
        usuarioDao.Registrar(usuarios);
    }

    @RequestMapping(value = "api/usuario/{id}",method = RequestMethod.DELETE)
    public void Eliminar(@PathVariable Long id){
        usuarioDao.Eliminar(id);
    }
}
