package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieNotExistsException;
import com.example.demo.Exception.QuantityLimitExceeded;
import com.example.demo.Exception.TurnoAlreadyExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.GiornataFerialeRepository;
import com.example.demo.Repository.R_FDRepository;
import com.example.demo.Repository.RuoloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GiornataFerialeService {

    @Autowired
    private GiornataFerialeRepository giornataFerialeRepository;
    @Autowired
    private DipendenteRepository dipendenteRepository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    private R_FDRepository r_FDRepository;



    @Transactional
    public void deleteRfd(long id) throws FerieNotExistsException {
        Optional<R_FD> r=r_FDRepository.findById(id);
        if(r.isPresent()) {
            if(r.get().getGiornataFeriale().getQuantità()==1){
                    giornataFerialeRepository.delete(r.get().getGiornataFeriale());
            }
            else{
                r.get().getGiornataFeriale().setQuantità(r.get().getGiornataFeriale().getQuantità()-1);
            }
            r_FDRepository.delete(r.get());
        }
        else {
            throw new FerieNotExistsException();
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
        if(id != -1 && !ruolo.equals("nessuno") ){
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
            for( R_FD r : ferie.get().getRfd() ){
                res.add(r.getDipendente());
            }
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
    public List<R_FD> giornataFerieFinByDipendente(Dipendente d){
        return d.getRfd();
    }
    
    @Transactional
    public void richiediFerie(Date data, Dipendente dipendente) throws QuantityLimitExceeded, DipendenteNotExistsException, TurnoAlreadyExistsException {
        Optional<GiornataFeriale> ferie = giornataFerialeRepository.findGiornataFerialeByDataGiornataFeriale(data);
        Optional<Dipendente> dip = dipendenteRepository.findById(dipendente.getId());
        if( !dip.isPresent() ) throw new DipendenteNotExistsException();
        verificaRfd(data, dip.get(), ferie.get());
        if (!ferie.isPresent()) {
            GiornataFeriale g = new GiornataFeriale();
            g.setVersione(1);
            g.setDataGiornataFeriale(data);
            g.setQuantità(1);
            giornataFerialeRepository.save(g);
            R_FD rfd = new R_FD();
            rfd.setGiornataFeriale(g);
            rfd.setDipendente(dip.get());
            r_FDRepository.save(rfd);
        }else{
            R_FD rfd = new R_FD();
            rfd.setGiornataFeriale(ferie.get());
            rfd.setDipendente(dip.get());
            ferie.get().setQuantità(ferie.get().getQuantità() + 1);
            r_FDRepository.save(rfd);
            try {
                giornataFerialeRepository.save(ferie.get());
            } catch (OptimisticLockingFailureException ex) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                richiediFerie(data, dipendente);
            }
        }
    }
    private void verificaRfd(Date data , Dipendente d, GiornataFeriale ferie) throws TurnoAlreadyExistsException, QuantityLimitExceeded{
        for(R_TD rtd : d.getRtd()){
            if(rtd.getTurnoLavorativoDate().equals(data)){
                throw new TurnoAlreadyExistsException();
            }
        }
        if ( ferie.getQuantità() >= 15 ||  d.getRfd().size() >= 20 ) {
            throw new QuantityLimitExceeded();
        }
    }
    
}
