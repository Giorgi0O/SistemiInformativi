package com.example.demo.Controller;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Dipendente;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Service.ContrattoLavorativoService;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.DtoDipendente;
import com.example.demo.Service.RuoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DipendenteController {

    @Autowired
    private DipendenteService dipendenteService;

    @Autowired
    private RuoloService ruoloService;

    @Autowired
    private ContrattoLavorativoService contrattoLavorativoService;

    @GetMapping("/dipendenti")
    public List<Dipendente> getAllDipendenti(){
        return dipendenteService.listaDipendenteRead();
    }

    @PostMapping("/postDipendente")
    public void dipendenteCreate(@RequestBody Dipendente d) throws DipendenteAlreadyExistsException {
        contrattoLavorativoService.contrattoCreate(d.getContrattoLavorativo());
        dipendenteService.dipendenteCreate(d);

    }

    @PutMapping("/putDipendente")
    public void dipendenteUpdate(@RequestBody Dipendente vecchio,@RequestBody Dipendente nuovo) throws DipendenteNotExistsException, ContrattoNotExistsException {
        if(!vecchio.getContrattoLavorativo().equals(nuovo.getContrattoLavorativo())){
            contrattoLavorativoService.contrattoUpdate(vecchio.getContrattoLavorativo(),nuovo.getContrattoLavorativo());
        }
        dipendenteService.dipendenteUpdate(vecchio,nuovo);
    }

    @DeleteMapping("/deleteDipendente")
    public void dipendenteDelete(@RequestBody Dipendente d) throws DipendenteNotExistsException, ContrattoNotExistsException {
        dipendenteService.dipendenteDelete(d);
        contrattoLavorativoService.contrattoDelete(d.getContrattoLavorativo());
    }

    @GetMapping("/dipendente/{id}")
    public Dipendente getDipendente(@PathVariable Long id) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFindById(id);
    }

    @GetMapping("/dipendentiFiltri")
    public List<Dipendente> getDipendenti(@RequestBody DtoDipendente dto) throws DipendenteNotExistsException {
        return dipendenteService.dipendenteFiltri(dto.getRuolo(), dto.getTipologiaContratto());
    }

    @GetMapping("/dipendentiNome/{nome}")
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

    @GetMapping("/contrattoDipendente")
    public ContrattoLavorativo getContratto(@RequestBody Dipendente dipendente) throws DipendenteNotExistsException {
        return contrattoLavorativoService.contrattoFindByDipendente(dipendente);
    }





}
