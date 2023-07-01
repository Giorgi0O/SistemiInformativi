package com.example.demo.Controller;

import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.RuoloNotExistsException;
import com.example.demo.Service.RuoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RuoloController {

    @Autowired
    private RuoloService ruoloService;

    @GetMapping("/ruoli")
    public List<Ruolo> getAllRuoli(){
        return ruoloService.listaRuoloRead();
    }

    @PostMapping("/postRuolo")
    public Ruolo createRuolo(@RequestBody Ruolo r){
        return ruoloService.ruoloCreate(r);
    }

    @PutMapping("/modificaRuolo/{id}")
    public Ruolo updateRuolo(@PathVariable long id,@RequestBody Ruolo nuovo) throws RuoloNotExistsException {
        return ruoloService.ruoloUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteRuolo/{id}")
    public void deleteRuolo(@PathVariable long id) throws RuoloNotExistsException {
        ruoloService.ruoloDelete(id);
    }

}
