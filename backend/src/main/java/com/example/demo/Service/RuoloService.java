package com.example.demo.Service;


import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.RuoloNotExistsException;
import com.example.demo.Repository.RuoloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RuoloService{

    @Autowired
    private RuoloRepository ruoloRepository;

    public Ruolo ruoloCreate(Ruolo r){
        return ruoloRepository.save(r);
    }

    public Ruolo ruoloUpdate(Long id,Ruolo nuovo) throws RuoloNotExistsException {
        Optional<Ruolo> vecchio=ruoloRepository.findById(id);
        if(vecchio.isPresent()){
            vecchio.get().setNome(nuovo.getNome());
            return ruoloRepository.save(vecchio.get());
        }else{
            throw new RuoloNotExistsException();
        }
    }

    public void ruoloDelete(Long id) throws RuoloNotExistsException {
        Optional<Ruolo> ruolo=ruoloRepository.findById(id);
        if(!ruolo.isPresent()){
            throw new RuoloNotExistsException();
        }
        ruoloRepository.delete(ruolo.get());
    }

    @Transactional(readOnly = true)
    public List<Ruolo> listaRuoloRead(){
        return ruoloRepository.findAll();
    }

}
