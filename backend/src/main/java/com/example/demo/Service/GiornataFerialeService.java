package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.GiornataFerialeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GiornataFerialeService {

    @Autowired
    private GiornataFerialeRepository giornataFerialeRepository;

    @Autowired
    private DipendenteRepository dipendenteRepository;

    public void giornataFerieCreate(GiornataFeriale ferie){
        giornataFerialeRepository.save(ferie);
    }

    public void giornataFerieUpdate(GiornataFeriale vecchia,GiornataFeriale nuova) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(vecchia.getId());
        if(ferie.isPresent()){
            vecchia.setDataGiornataFeriale(nuova.getDataGiornataFeriale());
            giornataFerialeRepository.save(vecchia);
        }else{
            throw new FerieNotExistsException();
        }
    }

    public void giornataFerieDelete(GiornataFeriale g) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(g.getId());
        if(ferie.isPresent()){
            giornataFerialeRepository.delete(g);
        }else{
            throw new FerieNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<GiornataFeriale> listaFerieRead(){
        return giornataFerialeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Dipendente> giornataFerieFiltri(Date data,Ruolo ruolo) throws FerieNotExistsException {
        if(data.equals(null) && !ruolo.equals(null)){
            return listaFerieRuolo(ruolo);
        }
        if(!data.equals(null) && ruolo.equals(null)){
            return listaFerieData(data);
        }
        if(!data.equals(null) && !ruolo.equals(null)){
            List<Dipendente> dipendenti=new ArrayList<>();
            for(Dipendente d:listaFerieRuolo(ruolo)){
                if(listaFerieData(data).contains(d)){
                    dipendenti.add(d);
                }
            }
            return dipendenti;
        }
        throw new FerieNotExistsException();
    }


    private List<Dipendente> listaFerieData(Date data){
        List<Dipendente> dipendenti=new ArrayList<>();
        for(Dipendente d:dipendenteRepository.findAll()){
            for(GiornataFeriale g:d.getGiornateFeriali()){
                if(g.getDataGiornataFeriale().equals(data) && !dipendenti.contains(d)){
                    dipendenti.add(d);
                }
            }
        }
        return dipendenti;
    }

    private List<Dipendente> listaFerieRuolo(Ruolo r){
        return dipendenteRepository.findDipendenteByRuolo(r);
    }

    @Transactional(readOnly = true)
    public GiornataFeriale giornataFerieFindById(Long id) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(id);
        if(ferie.isPresent()){
            return ferie.get();
        }
        throw new FerieNotExistsException();
    }

    @Transactional(readOnly = true)
    public GiornataFeriale giornataFerieFindByData(Date data) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findGiornataFerialeByDataGiornataFeriale(data);
        if(ferie.isPresent()){
            return ferie.get();
        }
        throw new FerieNotExistsException();
    }

    @Transactional(readOnly = true)
    public List<GiornataFeriale> giornataFerieFinByDipendente(Dipendente d) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(d.getId());
        if(dipendente.isPresent()){
            return dipendente.get().getGiornateFeriali();
        }
        throw new DipendenteNotExistsException();
    }


}
