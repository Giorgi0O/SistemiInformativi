package com.example.demo.Controller;

import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Service.TurnoLavorativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TurnoLavorativoController {

    @Autowired
    private TurnoLavorativoService turnoLavorativoService;

    @PostMapping("/postTurno")
    public TurnoLavorativo createTurno(@RequestBody TurnoLavorativo t){
        return turnoLavorativoService.turnoLavorativoCreate(t);
    }

    @PutMapping("/modificaTurno/{id}")
    public TurnoLavorativo updateTurno(@PathVariable Long id,@RequestBody TurnoLavorativo nuovo) throws TurnoLavorativoNotExistsException {
        TurnoLavorativo vecchio=turnoLavorativoService.turnoLavorativoFindById(id);
        return turnoLavorativoService.turnoLavorativoUpdate(vecchio, nuovo);
    }

    @DeleteMapping("/deleteTurno/{id}")
    public void deleteTurno(@PathVariable Long id) throws TurnoLavorativoNotExistsException {
        TurnoLavorativo t=turnoLavorativoService.turnoLavorativoFindById(id);
        turnoLavorativoService.turnoLavorativoDelete(t);
    }

    @GetMapping("/turni")
    public List<TurnoLavorativo> getAllTurni(){
        return turnoLavorativoService.listaTurnoLavorativoRead();
    }

    @GetMapping("/turno/{id}")
    public TurnoLavorativo getTurno(@PathVariable long id) throws TurnoLavorativoNotExistsException {
        return turnoLavorativoService.turnoLavorativoFindById(id);
    }

    @GetMapping("/orariTurni")
    public List<String> getAllOrariTurni(){
        return turnoLavorativoService.turnoLavorativoGetOrari();
    }




}
