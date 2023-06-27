package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import lombok.Data;

import java.util.Date;

@Data
public class DtoTD {

    private Date data;
    private Dipendente dipendente;

    public DtoTD(Date data,Dipendente d){
        this.dipendente=d;
        this.data=data;
    }
}
