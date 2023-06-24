package com.example.demo.Entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ContrattoLavorativo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String descrizione;

    private String tipologia;

}
