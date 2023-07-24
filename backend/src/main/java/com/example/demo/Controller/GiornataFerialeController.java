package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Exception.QuantityLimitExceeded;
import com.example.demo.Exception.TurnoAlreadyExistsException;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.GiornataFerialeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class GiornataFerialeController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private GiornataFerialeService giornataFerialeService;
    @Autowired
    private GiornataFerialeRepository giornataFerialeRepository;


    @DeleteMapping("/deleteFerie/{id}")
    @Secured("hasRole('direttoreCS')")
    public void deleteFerie( @PathVariable Long id ) throws FerieNotExistsException {
        giornataFerialeService.deleteRfd(id);
    }
    @GetMapping("/Ferie/{id}")
    @Secured("hasRole('direttoreCS')")
    public GiornataFeriale getFerie(@PathVariable long id) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindById(id);
    }
    @GetMapping("/rfd")
    @Secured("hasRole('direttoreCS')")
    public List<R_FD> getAllRFD() throws FerieNotExistsException {
        return giornataFerialeService.rfdFindAll();
    }
    @GetMapping("/FerieDipendente/{id}")
    @Secured("hasRole('direttoreCS') || hasRole('dipendenteCS')")
    public List<R_FD> getAllFerieByDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        Dipendente dipendente=dipendenteService.dipendenteFindById(id);
        return giornataFerialeService.giornataFerieFinByDipendente(dipendente);
    }
    @GetMapping("/ferieFiltri/{d}/{ruolo}")
    @Secured("hasRole('direttoreCS')")
    public List<Dipendente> getAllFerieFiltri(@PathVariable String d,@PathVariable String ruolo) throws FerieNotExistsException, ParseException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sd.parse(d);
        GiornataFeriale gf = giornataFerialeRepository.findByDataGiornataFeriale(date);
        return giornataFerialeService.giornataFerieFiltri(gf.getId(),ruolo);
    }
    @PostMapping("/richiediFerie/{d}")
    @Secured("hasRole('dipendenteCS')")
    public void richiediFerie(@PathVariable String d,@RequestBody Dipendente dipendente) throws ParseException, QuantityLimitExceeded, DipendenteNotExistsException, TurnoAlreadyExistsException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date data = sd.parse(d);
        giornataFerialeService.richiediFerie(data,dipendente);
    }


}
