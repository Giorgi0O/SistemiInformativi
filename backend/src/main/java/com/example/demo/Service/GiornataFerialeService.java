package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.GiornataFeriale;
import com.example.demo.Entity.R_FD;
import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Repository.R_FDRepository;
import com.example.demo.Repository.RuoloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GiornataFerialeService {

    @Autowired
    private GiornataFerialeRepository giornataFerialeRepository;

    @Autowired
    private DipendenteService dipendenteService;
    @Autowired
    private DipendenteRepository dipendenteRepository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    private R_FDRepository r_FDRepository;

    @Transactional
    public void dipendenteAddFerie(Long id, GiornataFeriale gf) throws DipendenteNotExistsException {
        Dipendente dip = dipendenteService.dipendenteFindById(id);
        if( !giornataFerialeRepository.existsById(gf.getId() ) ){
            giornataFerialeRepository.save(gf);
        }
        R_FD rfd = new R_FD();
        rfd.setDipendente(dip);
        rfd.setGiornataFeriale(gf);
        r_FDRepository.save(rfd);
    }//dipendenteAdd

    @Transactional
    public GiornataFeriale giornataFerieUpdate(GiornataFeriale vecchia,GiornataFeriale nuova) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie=giornataFerialeRepository.findById(vecchia.getId());
        if(ferie.isPresent()){
            vecchia.setDataGiornataFeriale(nuova.getDataGiornataFeriale());
            return giornataFerialeRepository.save(vecchia);
        }else{
            throw new FerieNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<GiornataFeriale> listaFerieRead(){
        return giornataFerialeRepository.findAll();
    }

    @Transactional
    public void deleteRfd(List<R_FD> ferie) throws FerieNotExistsException {
        for(R_FD r:ferie) {
            if(r_FDRepository.existsById(r.getId())) {
                r_FDRepository.delete(r);
            }
        }
    }

    @Transactional(readOnly = true)
    public List<R_FD> rfdFindAll(){
        return r_FDRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Dipendente> giornataFerieFiltri(long id,String ruolo) throws FerieNotExistsException {
        if( id==-1 && !ruolo.equals("nessuno")){
            return listaFerieRuolo(ruolo);
        }
        if( id!=-1 && ruolo.equals("nessuno")){
            return listaFerieData(id);
        }
        if(id != -1){
            List<Dipendente> dipendenti=new ArrayList<>();
            for(Dipendente d:listaFerieRuolo(ruolo)){
                if(listaFerieData(id).contains(d)){
                    dipendenti.add(d);
                }
            }
            return dipendenti;
        }
        throw new FerieNotExistsException();
    }
    private List<Dipendente> listaFerieData(long id) throws FerieNotExistsException {
        Optional<GiornataFeriale> ferie = giornataFerialeRepository.findById(id);
        List<Dipendente> res = new ArrayList<>();
        if(ferie.isPresent()){
            for( R_FD r : rfdFindAll() ){
                if(r.getGiornataFeriale().equals(ferie.get() ) )
                    res.add( r.getDipendente() );
            }
            return res;
        }
        throw new FerieNotExistsException();
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
    public List<Dipendente> giornataFerieFindByData(long id) throws FerieNotExistsException {
       return listaFerieData(id);
    }
    @Transactional(readOnly = true)
    public List<R_FD> giornataFerieFinByDipendente(Dipendente d) throws DipendenteNotExistsException {
        return r_FDRepository.findByDipendente(d);
    }
}
