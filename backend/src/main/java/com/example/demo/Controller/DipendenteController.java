package com.example.demo.Controller;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Dipendente;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Service.ContrattoLavorativoService;
import com.example.demo.Service.DipendenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DipendenteController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private ContrattoLavorativoService contrattoLavorativoService;

    @GetMapping("/dipendenti")
    public List<Dipendente> getAllDipendenti(){
        return dipendenteService.listaDipendenteRead();
    }

    @PostMapping("/postDipendente")
    public Dipendente dipendenteCreate(@RequestBody Dipendente d) throws DipendenteAlreadyExistsException {
        contrattoLavorativoService.contrattoCreate(d.getContrattoLavorativo());
        return dipendenteService.dipendenteCreate(d);
    }

    @PostMapping("/modificaDipendente/{id}")
    public Dipendente dipendenteUpdate(@PathVariable Long id,@RequestBody Dipendente nuovo) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente vecchio=dipendenteService.dipendenteFindById(id);
        if(!vecchio.getContrattoLavorativo().equals(nuovo.getContrattoLavorativo())){
            contrattoLavorativoService.contrattoUpdate(vecchio.getContrattoLavorativo(),nuovo.getContrattoLavorativo());
        }
        return dipendenteService.dipendenteUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteDipendente/{id}")
    public Dipendente dipendenteDelete(@PathVariable Long id) throws DipendenteNotExistsException, ContrattoNotExistsException {
        Dipendente d=dipendenteService.dipendenteFindById(id);
        contrattoLavorativoService.contrattoDelete(d.getContrattoLavorativo());
        return dipendenteService.dipendenteDelete(id);
    }

    @GetMapping("/dipendenti/{sede}")
    public List<Dipendente> getDipendentiBySede(@PathVariable String sede){
        return dipendenteService.dipendenteFindBySede(sede);
    }

    @GetMapping("/dipendente/{id}")
    public Dipendente getDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindById(id);
    }

    @GetMapping("/dipendentiFiltri/{ruolo}/{tipologiaContratto}")
    public List<Dipendente> getDipendenti(@PathVariable String ruolo,@PathVariable String tipologiaContratto) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFiltri(ruolo,tipologiaContratto);
    }

    @GetMapping("/dipendenti/{nome}")
    public List<Dipendente> getDipendenti(@PathVariable String nome){
        return dipendenteService.dipendenteFindByNome(nome);
    }

    @GetMapping("/contratti")
    public List<ContrattoLavorativo> getAllContratti(){
        return contrattoLavorativoService.listaContrattiRead();
    }

    @GetMapping("/contratto/{id}")
    public ContrattoLavorativo getContratto(@PathVariable Long id) throws ContrattoNotExistsException {
        return contrattoLavorativoService.contrattoFindById(id);
    }

    @GetMapping("/contrattoDipendente/{id}")
    public ContrattoLavorativo getContrattoDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return contrattoLavorativoService.contrattoFindByDipendente(id);
    }





}
