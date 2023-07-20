package com.example.demo.Controller;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Dipendente;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Service.ContrattoLavorativoService;
import com.example.demo.Service.DipendenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DipendenteController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private ContrattoLavorativoService contrattoLavorativoService;

    @GetMapping("/dipendenti")
    @PreAuthorize("hasRole('direttoreCS')")
    public List<Dipendente> getAllDipendenti(){
        return dipendenteService.listaDipendenteRead();
    }

    @PostMapping("/postDipendente")
    @PreAuthorize("hasRole('direttoreCS')")
    public Dipendente dipendenteCreate(@RequestBody Dipendente d) throws DipendenteAlreadyExistsException {
        System.out.println(d);
        contrattoLavorativoService.contrattoCreate(d.getContrattoLavorativo());
        return dipendenteService.dipendenteCreate(d);
    }

    @PutMapping("/modificaDipendente/{id}")
    @PreAuthorize("hasRole('direttoreCS')")
    public Dipendente dipendenteUpdate(@PathVariable Long id,@RequestBody Dipendente nuovo) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente vecchio=dipendenteService.dipendenteFindById(id);
        if(!vecchio.getContrattoLavorativo().getDescrizione().equals(nuovo.getContrattoLavorativo().getDescrizione()) || !vecchio.getContrattoLavorativo().getTipologia().equals(nuovo.getContrattoLavorativo().getTipologia()) ){
            contrattoLavorativoService.contrattoUpdate(vecchio.getContrattoLavorativo(),nuovo.getContrattoLavorativo());
        }
        return dipendenteService.dipendenteUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteDipendente/{id}")
    @PreAuthorize("hasRole('direttoreCS')")
    public void dipendenteDelete(@PathVariable Long id) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente d=dipendenteService.dipendenteFindById(id);
        dipendenteService.dipendenteDelete(id);
        contrattoLavorativoService.contrattoDelete(d.getContrattoLavorativo());
    }

    @GetMapping("/dipendenti/{sede}")
    @PreAuthorize("hasRole('direttoreCS')")
    public List<Dipendente> getDipendentiBySede(@PathVariable String sede){
        return dipendenteService.dipendenteFindBySede(sede);
    }

    @GetMapping("/dipendente/{id}")
    @PreAuthorize("hasRole('direttoreCS')")
    public Dipendente getDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindById(id);
    }

    @GetMapping("/dipendentiFiltri/{ruolo}/{tipologiaContratto}")
    @PreAuthorize("hasRole('direttoreCS')")
    public List<Dipendente> getDipendenti(@PathVariable String ruolo,@PathVariable String tipologiaContratto) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFiltri(ruolo,tipologiaContratto);
    }

    @GetMapping("/dipendentiNome/{nome}")
    @PreAuthorize("hasRole('direttoreCS')")
    public List<Dipendente> getDipendentiNome(@PathVariable String nome){
        return dipendenteService.dipendenteFindByNome(nome);
    }

    @GetMapping("/dipendenteEmail/{email}")
    @PreAuthorize("hasRole('dipendenteCS')")
    public Dipendente getDipendenteEmail(@PathVariable String email) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindByEmail(email);
    }

    @GetMapping("/contratti")
    @PreAuthorize("hasRole('direttoreCS')")
    public List<ContrattoLavorativo> getAllContratti(){
        return contrattoLavorativoService.listaContrattiRead();
    }

    @GetMapping("/contratto/{id}")
    @PreAuthorize("hasRole('direttoreCS')")
    public ContrattoLavorativo getContratto(@PathVariable Long id) throws ContrattoNotExistsException {
        return contrattoLavorativoService.contrattoFindById(id);
    }

    @GetMapping("/contrattoDipendente/{id}")
    @PreAuthorize("hasRole('direttoreCS')")
    public ContrattoLavorativo getContrattoDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return contrattoLavorativoService.contrattoFindByDipendente(id);
    }

    @GetMapping("/disponibilità/{id}")
    @PreAuthorize("hasRole('dipendenteCS')")
    public int disponibilita(@PathVariable Long id) throws DipendenteNotExistsException {
        return dipendenteService.disponibilita(id);
    }







}
