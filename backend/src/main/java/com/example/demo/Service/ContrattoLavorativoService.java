package com.example.demo.Service;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Repository.ContrattoLavorativoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ContrattoLavorativoService {

    @Autowired
    private ContrattoLavorativoRepository contrattoLavorativoRepository;

    @Transactional 
    public void contrattoCreate(ContrattoLavorativo c){
        contrattoLavorativoRepository.save(c);
    }
    @Transactional
    public void contrattoUpdate(ContrattoLavorativo vecchio,ContrattoLavorativo nuovo) throws ContrattoNotExistsException {
        if(!contrattoLavorativoRepository.existsById(vecchio.getId())){
            throw new ContrattoNotExistsException();
        }
        vecchio.setDescrizione(nuovo.getDescrizione());
        vecchio.setTipologia(nuovo.getTipologia().toLowerCase());
        contrattoLavorativoRepository.save(vecchio);
    }
    @Transactional
    public ContrattoLavorativo contrattoDelete(ContrattoLavorativo c) throws ContrattoNotExistsException {
        if(contrattoLavorativoRepository.existsById(c.getId())){
            contrattoLavorativoRepository.delete(c);
            return c;
        }
        else{
            throw new ContrattoNotExistsException();
        }
    }
}
