package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.GiornataFerialeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
public class GiornataFerialeController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private GiornataFerialeService giornataFerialeService;


    @PostMapping("/aggiungiNuovaFerie/{id}")
    //crea una nuova giornata di ferie
    public void aggiungiFerie(@PathVariable Long id, @RequestBody GiornataFeriale gf) throws DipendenteNotExistsException {
        giornataFerialeService.dipendenteAddFerie(id, gf);
    }


    @PostMapping ("/modificaFerie/{id}")
    public GiornataFeriale updateFerie(@PathVariable Long id,@RequestBody GiornataFeriale nuova) throws FerieNotExistsException {
        GiornataFeriale vecchia=giornataFerialeService.giornataFerieFindById(id);
        return giornataFerialeService.giornataFerieUpdate(vecchia, nuova);
    }

    //todo
    @DeleteMapping("/deleteFerie")
    public void deleteFerie(@RequestBody Dipendente d ) throws FerieNotExistsException, DipendenteNotExistsException {
        giornataFerialeService.deleteRfd(d);
    }

    @GetMapping("/Ferie")
    public List<GiornataFeriale> getAllFerie(){
        return giornataFerialeService.listaFerieRead();
    }

    //todo
    @GetMapping("/Ferie/{id}")
    public GiornataFeriale getFerie(@PathVariable long id) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindById(id);
    }

    @GetMapping("/Dipendenti/{data}")
    public List<Dipendente> getAllDipendentiByData(@PathVariable Date data) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindByData(data);
    }

    @GetMapping("/FerieDipendente/{id}")
    public List<R_FD> getAllFerieByDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        Dipendente dipendente=dipendenteService.dipendenteFindById(id);
        return giornataFerialeService.giornataFerieFinByDipendente(dipendente);
    }

    //todo convertire stringa in data
    @GetMapping("/ferieFiltri/{data}/{ruolo}")
    public List<Dipendente> getAllFerieFiltri(@PathVariable Date data,@PathVariable String ruolo) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFiltri(data,ruolo);
    }

}
