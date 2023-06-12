package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class GiornataFeriale {

    @Version
    private int versione;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Temporal(TemporalType.DATE)
    @Column(unique = true)
    private Date dataGiornataFeriale;

}
