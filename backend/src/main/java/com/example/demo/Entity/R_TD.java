package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"dipendente_id", "turno_lavorativo_id"})})
@Data
public class R_TD {

    @Id
    private long id;

    @ManyToOne
    @JoinColumn
    private Dipendente dipendente;

    @ManyToOne
    @JoinColumn
    private TurnoLavorativo turnoLavorativo;

    private boolean straordinario;

}
