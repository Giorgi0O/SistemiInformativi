package com.example.demo.Service;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Repository.ContrattoLavorativoRepository;
import com.example.demo.Repository.DipendenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DipendenteService {

    @Autowired
    private DipendenteRepository dipendenteRepository;

    @Autowired
    private ContrattoLavorativoRepository contrattoLavorativoRepository;



    public void dipendenteCreate(Dipendente d) throws DipendenteAlreadyExistsException {
        if(dipendenteRepository.existsById(d.getId())){
            throw new DipendenteAlreadyExistsException();
        }
        dipendenteRepository.save(d);
    }

    public void dipendenteUpdate(Dipendente vecchio,Dipendente nuovo) throws DipendenteNotExistsException {
        if(dipendenteRepository.existsById(vecchio.getId())){
            vecchio.setSede(nuovo.getSede());
            vecchio.setCognome(nuovo.getCognome());
            vecchio.setEmail(nuovo.getEmail());
            vecchio.setTelefono(nuovo.getTelefono());
            vecchio.setContrattoLavorativo(nuovo.getContrattoLavorativo());
            vecchio.setNome(nuovo.getNome());
            vecchio.setRtd(nuovo.getRtd());
            vecchio.setGiornateFeriali(nuovo.getGiornateFeriali());
            vecchio.setRuolo(nuovo.getRuolo());
            dipendenteRepository.save(vecchio);
        }else{
            throw new DipendenteNotExistsException();
        }
    }

    public void dipendenteDelete(Dipendente d) throws DipendenteNotExistsException {
        if(!dipendenteRepository.existsById(d.getId())){
            throw new DipendenteNotExistsException();
        }
        dipendenteRepository.delete(d);
    }

    @Transactional(readOnly = true)
    public Dipendente dipendenteFindById(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            return dipendente.get();
        }
        else{
            throw new DipendenteNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFindByNome(String nome){
        List<Dipendente> c=new ArrayList<>();
        c.addAll(dipendenteRepository.findDipendenteByNome(nome));
        c.addAll(dipendenteRepository.findDipendenteByCognome(nome));
        return c;
    }
    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFiltri(Ruolo ruolo, String tipologiaContratto) throws DipendenteNotExistsException {
        if(ruolo.equals(null)){
           if(!tipologiaContratto.equals(null)){
               return dipendenteFindByContratto(tipologiaContratto);
           }
        }
        if(tipologiaContratto.equals(null)){
            if(!ruolo.equals(null)){
                return dipendenteFindByRuolo(ruolo);
            }
        }
        if(!tipologiaContratto.equals(null) && !ruolo.equals(null)){
            List<Dipendente> dipendenti=new ArrayList<>();
            for(Dipendente d:dipendenteFindByRuolo(ruolo)){
                if(dipendenteFindByContratto(tipologiaContratto).contains(d)){
                    dipendenti.add(d);
                }
            }
            return dipendenti;
        }
        throw new DipendenteNotExistsException();
    }

    private List<Dipendente> dipendenteFindByContratto(String tipologia){
        List<Dipendente> dipendenti = new ArrayList<>();
        for(Dipendente d:dipendenteRepository.findAll()){
            if(d.getContrattoLavorativo().getTipologia().equals(tipologia)){
                dipendenti.add(d);
            }
        }
        return dipendenti;
    }

    private List<Dipendente> dipendenteFindByRuolo(Ruolo r){
        return dipendenteRepository.findDipendenteByRuolo(r);
    }

    @Transactional(readOnly = true)
    public List<Dipendente> listaDipendenteRead(){
        return dipendenteRepository.findAll();
    }
}

