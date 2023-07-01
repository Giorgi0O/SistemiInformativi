package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Repository.RuoloRepository;
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
    private RuoloRepository ruoloRepository;

    @Autowired
    private GiornataFerialeRepository giornataFerialeRepository;

    @Autowired
    private DipendenteRepository dipendenteRepository;

    public GiornataFeriale giornataFerieCreate(GiornataFeriale ferie){
        return giornataFerialeRepository.save(ferie);
    }

    public GiornataFeriale giornataFerieUpdate(GiornataFeriale vecchia,GiornataFeriale nuova) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(vecchia.getId());
        if(ferie.isPresent()){
            vecchia.setDataGiornataFeriale(nuova.getDataGiornataFeriale());
            return giornataFerialeRepository.save(vecchia);
        }else{
            throw new FerieNotExistsException();
        }
    }

    public GiornataFeriale giornataFerieDelete(GiornataFeriale g) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(g.getId());
        if(ferie.isPresent()){
            giornataFerialeRepository.delete(g);
            return ferie.get();
        }else{
            throw new FerieNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<GiornataFeriale> listaFerieRead(){
        return giornataFerialeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Dipendente> giornataFerieFiltri(Date data,String ruolo) throws FerieNotExistsException {
        if(data.equals(null) && !ruolo.equals(" ")){
            return listaFerieRuolo(ruolo);
        }
        if(!data.equals(null) && ruolo.equals(" ")){
            return listaFerieData(data);
        }
        if(!data.equals(null) && !ruolo.equals(" ")){
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

    private List<Dipendente> listaFerieRuolo(String r){
        Ruolo ruolo=ruoloRepository.findRuoloByNome(r);
        return dipendenteRepository.findDipendenteByRuolo(ruolo);
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
    public List<Dipendente> giornataFerieFindByData(Date data) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findGiornataFerialeByDataGiornataFeriale(data);
        if(ferie.isPresent()){
            List<Dipendente> dipendenti=new ArrayList<>();
            for(Dipendente d:dipendenteRepository.findAll()){
                if(d.getGiornateFeriali().contains(ferie.get())){
                    dipendenti.add(d);
                }
            }
            return dipendenti;
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
