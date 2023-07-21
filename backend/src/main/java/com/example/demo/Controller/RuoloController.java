package com.example.demo.Controller;

import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.RuoloNotExistsException;
import com.example.demo.Service.RuoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RuoloController {

    @Autowired
    private RuoloService ruoloService;

    @GetMapping("/ruoli")
    @Secured("hasRole('direttoreCS')")
    public List<Ruolo> getAllRuoli(){
        return ruoloService.listaRuoloRead();
    }

    @PostMapping("/postRuolo")
    @Secured("hasRole('direttoreCS')")
    public Ruolo createRuolo(@RequestBody Ruolo r){
        return ruoloService.ruoloCreate(r);
    }

    @PutMapping("/modificaRuolo/{id}")
    @Secured("hasRole('direttoreCS')")
    public Ruolo updateRuolo(@PathVariable long id,@RequestBody Ruolo nuovo) throws RuoloNotExistsException {
        return ruoloService.ruoloUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteRuolo/{id}")
    @Secured("hasRole('direttoreCS')")
    public Ruolo deleteRuolo(@PathVariable long id) throws RuoloNotExistsException {
        return ruoloService.ruoloDelete(id);
    }

}
