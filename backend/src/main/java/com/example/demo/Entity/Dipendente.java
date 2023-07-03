package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("Dipendente")
@Getter
@Setter
public class Dipendente extends Utente {

    private String sede;

    @OneToOne
    @JoinColumn
    private ContrattoLavorativo contrattoLavorativo;

    @ManyToOne
    @JoinColumn
    private Ruolo ruolo;

    @OneToMany(mappedBy = "dipendente")
    private List<R_TD> rtd;


}
