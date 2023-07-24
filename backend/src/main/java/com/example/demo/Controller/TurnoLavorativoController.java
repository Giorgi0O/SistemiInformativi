package com.example.demo.Controller;

import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Service.TurnoLavorativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TurnoLavorativoController {

    @Autowired
    private TurnoLavorativoService turnoLavorativoService;

    @GetMapping("/turni")
    @Secured("hasRole('direttoreCS')")
    public List<TurnoLavorativo> getAllTurni(){
        return turnoLavorativoService.listaTurnoLavorativoRead();
    }
    @GetMapping("/turno/{id}")
    @Secured("hasRole('direttoreCS')")
    public TurnoLavorativo getTurno(@PathVariable long id) throws TurnoLavorativoNotExistsException {
        return turnoLavorativoService.turnoLavorativoFindById(id);
    }
    
}
