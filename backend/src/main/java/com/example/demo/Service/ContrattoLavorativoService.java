package com.example.demo.Service;

import com.example.demo.Entity.ContrattoLavorativo;
import com.example.demo.Entity.Dipendente;
import com.example.demo.Exception.ContrattoNotExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Repository.ContrattoLavorativoRepository;
import com.example.demo.Repository.DipendenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ContrattoLavorativoService {

    @Autowired
    private ContrattoLavorativoRepository contrattoLavorativoRepository;

    @Autowired
    private DipendenteRepository dipendenteRepository;

    public void contrattoCreate(ContrattoLavorativo c){
        contrattoLavorativoRepository.save(c);
    }

    public void contrattoUpdate(ContrattoLavorativo vecchio,ContrattoLavorativo nuovo) throws ContrattoNotExistsException {
        if(!contrattoLavorativoRepository.existsById(vecchio.getId())){
            throw new ContrattoNotExistsException();
        }
        vecchio.setDescrizione(nuovo.getDescrizione());
        vecchio.setTipologia(nuovo.getTipologia());
        contrattoLavorativoRepository.save(vecchio);
    }

    public void contrattoDelete(ContrattoLavorativo c) throws ContrattoNotExistsException {
        if(contrattoLavorativoRepository.existsById(c.getId())){
            contrattoLavorativoRepository.delete(c);
        }
        else{
            throw new ContrattoNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<ContrattoLavorativo> listaContrattiRead(){
        return contrattoLavorativoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public ContrattoLavorativo contrattoFindById(long id) throws ContrattoNotExistsException {
        Optional<ContrattoLavorativo> contratto=contrattoLavorativoRepository.findById(id);
        if(contratto.isPresent()){
            return contratto.get();
        }else{
            throw new ContrattoNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public ContrattoLavorativo contrattoFindByDipendente(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            return dipendente.get().getContrattoLavorativo();
        }
        else{
            throw new DipendenteNotExistsException();
        }
    }





}
