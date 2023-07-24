package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.R_FD;
import com.example.demo.Entity.R_TD;
import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.FerieAlreadyExistsException;
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

    @Transactional
    public void rtdCreate(Long id,Long id_t,DtoRTD dto) throws TurnoLavorativoNotExistsException, DipendenteNotExistsException, FerieAlreadyExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(!dipendente.isPresent()){
            throw new DipendenteNotExistsException();
        }
        verificaRTD( dto, dipendente.get() );
        Optional<TurnoLavorativo> turno=turnoLavorativoRepository.findById(id_t);
        if(!turno.isPresent()){
            throw new TurnoLavorativoNotExistsException();
        }
        R_TD ne = new R_TD();
        ne.setDipendente(dipendente.get());
        ne.setTurnoLavorativo(turno.get());
        ne.setStraordinario(dto.isStraordinario());
        ne.setTurnoLavorativoDate(dto.getData());
        rtdRepository.save(ne);
    }
    private void verificaRTD( DtoRTD dto , Dipendente d ) throws FerieAlreadyExistsException{
        for(R_FD rfd:d.getRfd()){
            if(rfd.getGiornataFeriale().getDataGiornataFeriale().equals(dto.getData())){
                throw new FerieAlreadyExistsException();
            }
        }
    }
   
    @Transactional
    public R_TD rtdDelete(Long id) throws TurnoDipendenteNotExistsException {
        Optional<R_TD> rtd=rtdRepository.findById(id);
        if(!rtd.isPresent()){
            throw new TurnoDipendenteNotExistsException();
        }
        rtdRepository.delete(rtd.get());
        return rtd.get();
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
            return dipendente.get().getRtd();
        }else{
            throw new DipendenteNotExistsException();
        }
    }
    private List<R_TD> rtdFindbyData(Date data){
        return rtdRepository.findR_TDByTurnoLavorativoDate(data);
    }
}
