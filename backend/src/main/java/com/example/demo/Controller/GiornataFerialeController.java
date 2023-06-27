package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Service.DtoFerie;
import com.example.demo.Service.GiornataFerialeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class GiornataFerialeController {

    @Autowired
    private GiornataFerialeService giornataFerialeService;

    @PostMapping("/postFerie")
    public void createFerie(@RequestBody GiornataFeriale giornataFeriale){
        giornataFerialeService.giornataFerieCreate(giornataFeriale);
    }

    @PutMapping("/putFerie")
    public void updateFerie(@RequestBody GiornataFeriale vecchia,@RequestBody GiornataFeriale nuova) throws FerieNotExistsException {
        giornataFerialeService.giornataFerieUpdate(vecchia, nuova);
    }

    @DeleteMapping("/deleteFerie")
    public void deleteFerie(@RequestBody GiornataFeriale giornataFeriale) throws FerieNotExistsException {
        giornataFerialeService.giornataFerieDelete(giornataFeriale);
    }

    @GetMapping("/Ferie")
    public List<GiornataFeriale> getAllFerie(){
        return giornataFerialeService.listaFerieRead();
    }

    @GetMapping("/Ferie/{id}")
    public GiornataFeriale getFerie(@PathVariable long id) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindById(id);
    }

    @GetMapping("/Dipendenti/{data}")
    public List<Dipendente> getAllDipendentiByData(@PathVariable Date data) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindByData(data);
    }

    @GetMapping("/FerieDipendente")
    public List<GiornataFeriale> getAllFerieByDipendente(@RequestBody Dipendente dipendente) throws DipendenteNotExistsException {
        return giornataFerialeService.giornataFerieFinByDipendente(dipendente);
    }

    @GetMapping("/ferieFiltri")
    public List<Dipendente> getAllFerieFiltri(@RequestBody DtoFerie dto) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFiltri(dto.getData(),dto.getRuolo());
    }

}
