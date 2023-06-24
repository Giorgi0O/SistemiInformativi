package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.R_TD;
import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Repository.R_TDRepository;
import com.example.demo.Repository.TurnoLavorativoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class R_TDService {

    @Autowired
    private R_TDRepository rtdRepository;

    @Autowired
    private TurnoLavorativoRepository turnoLavorativoRepository;

    public void rtdCreate(R_TD turnoDipendente){
        rtdRepository.save(turnoDipendente);
    }

    public void rtdUpdate(R_TD vecchio,R_TD nuovo) throws TurnoDipendenteNotExistsException {
        if(!rtdRepository.existsById(vecchio.getId())){
           throw new TurnoDipendenteNotExistsException();
        }
        vecchio.setDipendente(nuovo.getDipendente());
        vecchio.setTurnoLavorativo(nuovo.getTurnoLavorativo());
        rtdRepository.save(vecchio);
    }

    public void rtdDelete(R_TD rtd) throws TurnoDipendenteNotExistsException {
        if(!rtdRepository.existsById(rtd.getId())){
            throw new TurnoDipendenteNotExistsException();
        }
        rtdRepository.delete(rtd);
    }

    @Transactional(readOnly = true)
    public List<R_TD> listaRtdRead(){
        return rtdRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<R_TD> rtdFiltri(Date data, Dipendente d) throws TurnoDipendenteNotExistsException {
        if(data.equals(null) && !d.equals(null)){
            return rtdFindByDipendente(d);
        }
        if(!data.equals(null) && d.equals(null)){
            return rtdFindbyData(data);
        }
        if(!data.equals(null) && !d.equals(null)){
            List<R_TD> l=new ArrayList<>();
            for(R_TD rtd:rtdFindByDipendente(d)){
                if(rtdFindbyData(data).contains(rtd)){
                    l.add(rtd);
                }
            }
            return l;
        }
        throw new TurnoDipendenteNotExistsException();
    }

    private List<R_TD> rtdFindByDipendente(Dipendente dipendente){
        return rtdRepository.findR_TDByDipendente(dipendente);
    }

    private List<R_TD> rtdFindbyData(Date data){
        List<R_TD> l=new ArrayList<>();
        for(TurnoLavorativo t:turnoLavorativoRepository.findAll()){
            if(t.getTurnoLavorativoDate().equals(data)){
                l.addAll(rtdRepository.findR_TDByTurnoLavorativo(t));
            }
        }
        return l;
    }
}
