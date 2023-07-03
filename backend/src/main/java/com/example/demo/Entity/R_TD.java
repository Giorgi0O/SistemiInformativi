package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"dipendente_id", "turno_lavorativo_id"})})
@Setter
@Getter
public class R_TD {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn
    private Dipendente dipendente;

    @ManyToOne
    @JoinColumn
    private TurnoLavorativo turnoLavorativo;

    private boolean straordinario;

    @Temporal(TemporalType.DATE)
    private Date turnoLavorativoDate;

}
