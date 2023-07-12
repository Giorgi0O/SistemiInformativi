package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"turno_lavorativo_date","dipendente_id","turno_lavorativo_id"})} )
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
    @Column(name = "turno_lavorativo_date")
    private Date turnoLavorativoDate;

}
