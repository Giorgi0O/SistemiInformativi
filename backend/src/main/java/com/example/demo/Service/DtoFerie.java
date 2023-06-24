package com.example.demo.Service;

import com.example.demo.Entity.Ruolo;
import lombok.Data;

import java.util.Date;

@Data
public class DtoFerie {

    private Date data;
    private Ruolo ruolo;

    public DtoFerie(Date data,Ruolo ruolo){
        this.data=data;
        this.ruolo=ruolo;
    }
}
