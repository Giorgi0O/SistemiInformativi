package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"oraInizio", "oraFine", "turnoLavorativoDate"})})
public class TurnoLavorativo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Temporal(TemporalType.DATE)
    private Date turnoLavorativoDate;

    @Version
    private int versione;

    @Temporal(TemporalType.TIME)
    private Time oraInizio;

    @Temporal(TemporalType.TIME)
    private Time oraFine;

}
