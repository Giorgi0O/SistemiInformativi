package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Exception.QuantityLimitExceeded;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.GiornataFerialeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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


    @PostMapping("/aggiungiNuovaFerie/{id}")
    public void aggiungiFerie(@PathVariable Long id, @RequestBody GiornataFeriale gf) throws DipendenteNotExistsException {
        giornataFerialeService.dipendenteAddFerie(id, gf);
    }


    @PostMapping ("/modificaFerie/{id}")
    public GiornataFeriale updateFerie(@PathVariable Long id,@RequestBody GiornataFeriale nuova) throws FerieNotExistsException {
        GiornataFeriale vecchia=giornataFerialeService.giornataFerieFindById(id);
        return giornataFerialeService.giornataFerieUpdate(vecchia, nuova);
    }
    @DeleteMapping("/deleteFerie")
    public void deleteFerie( @RequestBody List<Integer> ferie ) throws FerieNotExistsException {
        ArrayList<R_FD> rfd = new ArrayList<>();
        for( int i : ferie ){
            R_FD r = new R_FD();
            r.setId(i);
            rfd.add(r);
        }
        giornataFerialeService.deleteRfd(rfd);
    }

    @GetMapping("/Ferie")
    public List<GiornataFeriale> getAllFerie(){
        return giornataFerialeService.listaFerieRead();
    }

    @GetMapping("/Ferie/{id}")
    public GiornataFeriale getFerie(@PathVariable long id) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindById(id);
    }

    @GetMapping("/rfd")
    public List<R_FD> getAllRFD() throws FerieNotExistsException {
        return giornataFerialeService.rfdFindAll();
    }
    @GetMapping("/Dipendenti/{id}")
    public List<Dipendente> getAllDipendentiByData(@PathVariable long id) throws FerieNotExistsException {
        return giornataFerialeService.giornataFerieFindByData(id);
    }
    @GetMapping("/FerieDipendente/{id}")
    public List<R_FD> getAllFerieByDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        Dipendente dipendente=dipendenteService.dipendenteFindById(id);
        return giornataFerialeService.giornataFerieFinByDipendente(dipendente);
    }
    @GetMapping("/ferieFiltri/{d}/{ruolo}")
    public List<Dipendente> getAllFerieFiltri(@PathVariable String d,@PathVariable String ruolo) throws FerieNotExistsException, ParseException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sd.parse(d);
        GiornataFeriale gf = giornataFerialeRepository.findByDataGiornataFeriale(date);
        return giornataFerialeService.giornataFerieFiltri(gf.getId(),ruolo);
    }

    @PostMapping("/richiediFerie/{d}")
    public void richiediFerie(@PathVariable String d,@RequestBody Dipendente dipendente) throws ParseException,QuantityLimitExceeded {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date data = sd.parse(d);
        giornataFerialeService.richiediFerie(data,dipendente);
    }

}
