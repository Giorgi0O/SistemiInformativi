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
    public void createTurno(@RequestBody TurnoLavorativo t){
        turnoLavorativoService.turnoLavorativoCreate(t);
    }

    @PutMapping("/putTurno")
    public void updateTurno(@RequestBody TurnoLavorativo vecchio,@RequestBody TurnoLavorativo nuovo) throws TurnoLavorativoNotExistsException {
        turnoLavorativoService.turnoLavorativoUpdate(vecchio, nuovo);
    }

    @DeleteMapping("/deleteTurno")
    public void deleteTurno(@RequestBody TurnoLavorativo t) throws TurnoLavorativoNotExistsException {
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
