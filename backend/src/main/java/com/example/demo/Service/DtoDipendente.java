package com.example.demo.Service;

import com.example.demo.Entity.Ruolo;
import lombok.Data;

@Data
public class DtoDipendente {

    private Ruolo ruolo;
    private String tipologiaContratto;

    public DtoDipendente(Ruolo ruolo,String tipologiaContratto){
        this.ruolo=ruolo;
        this.tipologiaContratto=tipologiaContratto;
    }
}
