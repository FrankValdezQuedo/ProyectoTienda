package com.example.tienda.controllers;

import com.example.tienda.dao.ProductoDao;
import com.example.tienda.models.Productos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductoController {

    @Autowired
    ProductoDao productoDao;
    @RequestMapping(value = "api/productos",method = RequestMethod.GET)
    public List<Productos> ListarProductos(){
        return productoDao.ListaUsuarios();
    }

    @RequestMapping(value = "api/productoId/{id}",method = RequestMethod.GET)
    public List<Productos> ListarPorId(@PathVariable Long id){
        return productoDao.buscarPorId(id);
    }

    @RequestMapping(value = "api/registrarproducto", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Productos productos) {
        productoDao.Registrar(productos);
    }

    @RequestMapping(value = "api/producto/{id}", method = RequestMethod.DELETE)
    public void Eliminar(@PathVariable Long id) {
        productoDao.Eliminar(id);
    }
}
