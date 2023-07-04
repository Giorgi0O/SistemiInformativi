package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.R_TD;
import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Repository.DipendenteRepository;
import com.example.demo.Repository.R_TDRepository;
import com.example.demo.Repository.TurnoLavorativoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class R_TDService {

    @Autowired
    private R_TDRepository rtdRepository;
    @Autowired
    private DipendenteRepository dipendenteRepository;

    @Autowired
    private TurnoLavorativoRepository turnoLavorativoRepository;

    public void rtdCreate(R_TD nuovo) throws TurnoLavorativoNotExistsException {
        rtdRepository.save(nuovo);
    }

    public R_TD rtdUpdate(long id,R_TD nuovo) throws TurnoDipendenteNotExistsException {
        Optional<R_TD> vecchio=rtdRepository.findById(id);
        if(!vecchio.isPresent()){
           throw new TurnoDipendenteNotExistsException();
        }
        vecchio.get().setTurnoLavorativoDate( nuovo.getTurnoLavorativoDate() );
        vecchio.get().setDipendente(nuovo.getDipendente());
        vecchio.get().setTurnoLavorativo(nuovo.getTurnoLavorativo());
        return rtdRepository.save(vecchio.get());
    }

    public R_TD rtdDelete(Long id) throws TurnoDipendenteNotExistsException {
        Optional<R_TD> rtd=rtdRepository.findById(id);
        if(!rtd.isPresent()){
            throw new TurnoDipendenteNotExistsException();
        }
        rtdRepository.delete(rtd.get());
        return rtd.get();
    }


    @Transactional(readOnly = true)
    public List<R_TD> listaRtdRead(){
        return rtdRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<R_TD> rtdFiltri(Date data, long d) throws TurnoDipendenteNotExistsException, DipendenteNotExistsException {
            if( d != -1 ) {
                List<R_TD> l=new ArrayList<>();
                for(R_TD rtd:rtdFindByDipendente(d)){
                    if(rtdFindbyData(data).contains(rtd)){
                        l.add(rtd);
                    }
                }
                return l;
            }else {
                return rtdFindbyData(data);
            }
    }
    private List<R_TD> rtdFindByDipendente(long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente = dipendenteRepository.findById(id);
        if(dipendente.isPresent()) {
            return rtdRepository.findR_TDByDipendente(dipendente.get());
        }else  throw new DipendenteNotExistsException();
    }
    private List<R_TD> rtdFindbyData(Date data){
        return rtdRepository.findR_TDByTurnoLavorativoDate(data);
    }
}
