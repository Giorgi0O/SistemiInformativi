package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Repository.*;
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
    private GiornataFerialeRepository giornataFerieREpository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    private R_FDRepository r_FDRepository;
    @Autowired
    private R_TDRepository r_tdRepository;



    public Dipendente dipendenteCreate(Dipendente d) throws DipendenteAlreadyExistsException {
        if(dipendenteRepository.existsById(d.getId())){
            throw new DipendenteAlreadyExistsException();
        }
        GestKeycloak.aggiungiKeycloak( d.getEmail()  );
        return dipendenteRepository.save(d);
    }


    @Transactional
    public Dipendente dipendenteUpdate(Long id,Dipendente nuovo) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            dipendente.get().setSede(nuovo.getSede());
            dipendente.get().setCognome(nuovo.getCognome());
            dipendente.get().setEmail(nuovo.getEmail());
            dipendente.get().setTelefono(nuovo.getTelefono());
            dipendente.get().setRuolo(nuovo.getRuolo());
            dipendente.get().setNome(nuovo.getNome());
            dipendente.get().setRtd(nuovo.getRtd());
            return dipendenteRepository.save(dipendente.get());
        }else{
            throw new DipendenteNotExistsException();
        }
    }
    
    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFindBySede( String sede ){
        return dipendenteRepository.findDipendenteBySede(sede);
    }

    @Transactional
    public void dipendenteDelete(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            for(R_FD rfd:dipendente.get().getRfd()){
                GiornataFeriale gf=rfd.getGiornataFeriale();
                if(gf.getQuantità()==1){
                    giornataFerieREpository.delete(gf);
                }
                else{
                    gf.setQuantità(gf.getQuantità()-1);
                }
            }
            r_FDRepository.deleteAll(dipendente.get().getRfd());
            r_tdRepository.deleteAll(dipendente.get().getRtd());
            GestKeycloak.deleteUser(dipendente.get().getEmail() );
            dipendenteRepository.delete(dipendente.get());
        }else{
            throw new DipendenteNotExistsException();
        }
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
        for( Dipendente d : dipendenteRepository.findAll() ){
            if( d.getNome().toUpperCase().equals(nome.toUpperCase()) || d.getCognome().toUpperCase().equals(nome.toUpperCase()) ){
                c.add(d);
            }
        }
        return c;
    }
    @Transactional(readOnly = true)
    public Dipendente dipendenteFindByEmail(String email) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findDipendenteByEmail(email);
        if(dipendente.isPresent()){
            return dipendente.get();
        }
        throw new DipendenteNotExistsException();
    }

    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFiltri(String ruolo, String tipologiaContratto) throws DipendenteNotExistsException {
        if(ruolo.equals("nessuno")){
           if(!tipologiaContratto.equals("nessuno")){
               return dipendenteFindByContratto(tipologiaContratto.toLowerCase());
           }else{
               return dipendenteRepository.findAll();
           }
        }
        if(tipologiaContratto.equals("nessuno")){
            return dipendenteFindByRuolo(ruolo);
        }
        List<Dipendente> dipendenti = new ArrayList<>();
        for(Dipendente d:dipendenteFindByRuolo(ruolo)){
            if(dipendenteFindByContratto(tipologiaContratto.toLowerCase()).contains(d)){
                dipendenti.add(d);
            }
        }
        return dipendenti;
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

    private List<Dipendente> dipendenteFindByRuolo(String ruolo){
        Ruolo r=ruoloRepository.findRuoloByNome(ruolo);
        return dipendenteRepository.findDipendenteByRuolo(r);
    }

    @Transactional(readOnly = true)
    public List<Dipendente> listaDipendenteRead(){
        return dipendenteRepository.findAll();
    }
    @Transactional(readOnly = true)
    public int disponibilita(long id) throws DipendenteNotExistsException {
        Optional<Dipendente> d=dipendenteRepository.findById(id);
        if(d.isPresent()){
            return 20-d.get().getRfd().size();
        }
        throw new DipendenteNotExistsException();
    }



}

