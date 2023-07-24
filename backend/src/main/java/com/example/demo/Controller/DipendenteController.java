package com.example.demo.Controller;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Service.ContrattoLavorativoService;
import com.example.demo.Service.DipendenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DipendenteController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private ContrattoLavorativoService contrattoLavorativoService;

    @GetMapping("/dipendenti")
    @Secured("hasRole('direttoreCS')")
    public List<Dipendente> getAllDipendenti(){
        return dipendenteService.listaDipendenteRead();
    }

    @PostMapping("/postDipendente")
    @Secured("hasRole('direttoreCS')")
    public Dipendente dipendenteCreate(@RequestBody Dipendente d) throws DipendenteAlreadyExistsException {
        System.out.println(d);
        contrattoLavorativoService.contrattoCreate(d.getContrattoLavorativo());
        return dipendenteService.dipendenteCreate(d);
    }

    @PutMapping("/modificaDipendente/{id}")
    @Secured("hasRole('direttoreCS')")
    public Dipendente dipendenteUpdate(@PathVariable Long id,@RequestBody Dipendente nuovo) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente vecchio=dipendenteService.dipendenteFindById(id);
        if( !vecchio.getContrattoLavorativo().equals(nuovo.getContrattoLavorativo()) ){
            contrattoLavorativoService.contrattoUpdate(vecchio.getContrattoLavorativo(),nuovo.getContrattoLavorativo());
        }
        return dipendenteService.dipendenteUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteDipendente/{id}")
    @Secured("hasRole('direttoreCS')")
    public void dipendenteDelete(@PathVariable Long id) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente d=dipendenteService.dipendenteFindById(id);
        dipendenteService.dipendenteDelete(id);
        contrattoLavorativoService.contrattoDelete(d.getContrattoLavorativo());
    }

    @GetMapping("/dipendente/{id}")
    @Secured("hasRole('direttoreCS')")
    public Dipendente getDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindById(id);
    }

    @GetMapping("/dipendentiFiltri/{ruolo}/{tipologiaContratto}")
    @Secured("hasRole('direttoreCS')")
    public List<Dipendente> getDipendenti(@PathVariable String ruolo,@PathVariable String tipologiaContratto) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFiltri(ruolo,tipologiaContratto);
    }

    @GetMapping("/dipendentiNome/{nome}")
    @Secured("hasRole('direttoreCS')")
    public List<Dipendente> getDipendentiNome(@PathVariable String nome){
        return dipendenteService.dipendenteFindByNome(nome);
    }

    @GetMapping("/dipendenteEmail/{email}")
    @Secured("hasRole('dipendenteCS')")
    public Dipendente getDipendenteEmail(@PathVariable String email) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindByEmail(email);
    }

    @GetMapping("/disponibilita/{email}")
    @Secured("hasRole('dipendenteCS')")
    public int disponibilita(@PathVariable String email) throws DipendenteNotExistsException {
        return dipendenteService.disponibilita(email);
    }







}
