package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Repository.R_FDRepository;
import com.example.demo.Repository.RuoloRepository;
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
    private RuoloRepository ruoloRepository;
    @Autowired
    private R_FDRepository r_FDRepository;


    public Dipendente dipendenteCreate(Dipendente d) throws DipendenteAlreadyExistsException {
        if(dipendenteRepository.existsById(d.getId())){
            throw new DipendenteAlreadyExistsException();
        }
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
    public Dipendente dipendenteDelete(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(!dipendente.isPresent()){
            throw new DipendenteNotExistsException();
        }
        dipendenteRepository.delete(dipendente.get());
        return dipendente.get();
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
    public List<Dipendente> dipendenteFiltri(String ruolo, String tipologiaContratto) throws DipendenteNotExistsException {
        if(ruolo.equals("nessuno")){
           if(!tipologiaContratto.equals(" ")){
               return dipendenteFindByContratto(tipologiaContratto);
           }
        }
        if(tipologiaContratto.equals("nessuno")){
            if(!ruolo.equals("nessuno")){
                return dipendenteFindByRuolo(ruolo);
            }
        }
        if( !tipologiaContratto.equals("nessuno") && !ruolo.equals("nessuno") ){
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

    private List<Dipendente> dipendenteFindByRuolo(String ruolo){
        Ruolo r=ruoloRepository.findRuoloByNome(ruolo);
        return dipendenteRepository.findDipendenteByRuolo(r);
    }

    @Transactional(readOnly = true)
    public List<Dipendente> listaDipendenteRead(){
        return dipendenteRepository.findAll();
    }


}

