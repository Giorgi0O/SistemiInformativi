package com.example.demo.Service;

import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Repository.TurnoLavorativoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoLavorativoService {

    @Autowired
    private TurnoLavorativoRepository turnoLavorativoRepository;


    @Transactional(readOnly = true)
    public TurnoLavorativo turnoLavorativoFindById(long id) throws TurnoLavorativoNotExistsException {
        Optional<TurnoLavorativo> turno=turnoLavorativoRepository.findById(id);
        if(turno.isPresent()){
            return turno.get();
        }else{
            throw new TurnoLavorativoNotExistsException();
        }
    }
    @Transactional(readOnly = true)
    public List<TurnoLavorativo> listaTurnoLavorativoRead(){
        return turnoLavorativoRepository.findAll();
    }
    
}
