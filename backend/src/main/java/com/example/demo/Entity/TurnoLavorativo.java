package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Entity
//@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"ora_inizio", "ora_fine"})} )
@Getter
@Setter
public class TurnoLavorativo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Temporal(TemporalType.TIME)
    private Time oraInizio;

    @Temporal(TemporalType.TIME)
    private Time oraFine;

}
