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
    public void createRuolo(@RequestBody Ruolo r){
        ruoloService.ruoloCreate(r);
    }

    @PutMapping("/putRuolo")
    public void updateRuolo(@RequestBody Ruolo vecchio,@RequestBody Ruolo nuovo) throws RuoloNotExistsException {
        ruoloService.ruoloUpdate(vecchio,nuovo);
    }

    @DeleteMapping("/deleteRuolo")
    public void deleteRuolo(@RequestBody Ruolo r) throws RuoloNotExistsException {
        ruoloService.ruoloDelete(r);
    }

}
