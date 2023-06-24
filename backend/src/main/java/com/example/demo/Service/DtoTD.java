package com.example.demo.Service;

import com.example.demo.Entity.Dipendente;
import lombok.Data;

import java.util.Date;

@Data
public class DtoTD {

    private Date data;
    private Dipendente d;

    public DtoTD(Date data,Dipendente d){
        this.d=d;
        this.data=data;
    }
}
