package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @ManyToMany
    @JoinTable(name = "R_DF")
    private List<GiornataFeriale> giornateFeriali;

    @OneToMany(mappedBy = "dipendente")
    private List<R_TD> rtd;

}
