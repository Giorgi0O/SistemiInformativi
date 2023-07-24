package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Entity
@Getter
@Setter
public class Dipendente{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String email;

    private long telefono;

    private String cognome;

    private String nome;

    private String sede;

    @OneToOne
    @JoinColumn
    private ContrattoLavorativo contrattoLavorativo;

    @ManyToOne
    @JoinColumn
    private Ruolo ruolo;

    @OneToMany(mappedBy = "dipendente")
    @JsonIgnore
    private List<R_TD> rtd;

    @OneToMany(mappedBy = "dipendente")
    @JsonIgnore
    private List<R_FD> rfd;

    //data assunzione

}
