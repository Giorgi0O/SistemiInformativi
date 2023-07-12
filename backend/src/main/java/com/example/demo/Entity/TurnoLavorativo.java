package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

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

    @OneToMany(mappedBy = "turnoLavorativo")
    @JsonIgnore
    private List<R_TD> rtd;

}
