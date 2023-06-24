package com.example.demo.Service;


import com.example.demo.Entity.Ruolo;
import com.example.demo.Exception.RuoloNotExistsException;
import com.example.demo.Repository.RuoloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RuoloService{

    @Autowired
    private RuoloRepository ruoloRepository;

    public void ruoloCreate(Ruolo r){
        ruoloRepository.save(r);
    }

    public void ruoloUpdate(Ruolo vecchio,Ruolo nuovo) throws RuoloNotExistsException {
        if(ruoloRepository.existsById(vecchio.getId())){
            vecchio.setNome(nuovo.getNome());
            ruoloRepository.save(vecchio);
        }else{
            throw new RuoloNotExistsException();
        }
    }

    public void ruoloDelete(Ruolo r) throws RuoloNotExistsException {
        if(!ruoloRepository.existsById(r.getId())){
            throw new RuoloNotExistsException();
        }
        ruoloRepository.delete(r);
    }

    @Transactional(readOnly = true)
    public List<Ruolo> listaRuoloRead(){
        return ruoloRepository.findAll();
    }

}
