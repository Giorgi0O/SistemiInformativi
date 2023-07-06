package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "dipendente")
    @JsonIgnore
    private List<R_TD> rtd;


}
