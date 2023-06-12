package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ruolo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Version
    private int versione;

    @Column(unique = true)
    private String nome;

}
