package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name = "Tipologia")
@Entity
@Data
public abstract class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String email;

    private long telefono;

    private String cognome;

    private String nome;

}
